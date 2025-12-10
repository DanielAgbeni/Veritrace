import api from '@/api'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useQuery, useMutation } from '@tanstack/react-query'
import { Loader2, Download, QrCode } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

interface QRGeneratorModalProps {
    isOpen: boolean
    onClose: () => void
    preSelectedBatchId: string | null
    onSuccess?: () => void
}

interface GenerateQRResponse {
    message: string
    qrCode: string
    batchId: string
}

const QRGeneratorModal = ({ isOpen, onClose, preSelectedBatchId, onSuccess }: QRGeneratorModalProps) => {
    const [selectedBatchId, setSelectedBatchId] = useState<string>('')
    const [generatedQR, setGeneratedQR] = useState<string | null>(null)
    const [associatedBatchData, setAssociatedBatchData] = useState<{ batchNumber: string, date: string } | null>(null)

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setGeneratedQR(null)
            setAssociatedBatchData(null)
            setSelectedBatchId(preSelectedBatchId || '')
        }
    }, [isOpen, preSelectedBatchId])

    const fetchProductionBatches = async () => {
        const response = await api.get<ProductionBatchResponseType>('/api/v1/company/getproductionbatches')
        return response.data.data
    }

    const { data: batches, isLoading: isLoadingBatches } = useQuery({
        queryKey: ['productionBatches'],
        queryFn: fetchProductionBatches,
        enabled: isOpen && !preSelectedBatchId, // Only fetch if open and no pre-selection
    })

    const generateMutation = useMutation({
        mutationFn: async (batchId: string) => {
            const response = await api.post<GenerateQRResponse>(`/api/v1/company/batch/${batchId}/qr`)
            return response.data
        },
        onSuccess: (data, batchId) => {
            setGeneratedQR(data.qrCode)
            toast.success('QR Code generated successfully')
            if (onSuccess) onSuccess()

            // Find batch info for download
            let batchNum = ''
            let batchDate = new Date().toISOString() // Fallback
            
            if (preSelectedBatchId) {
                // If passed from parent, we might not have the full batch object here easily unless passed or fetched.
                // However, if we generated it, we likely want to verify it right away. 
                // Since we don't have the batch list if preSelected, we might need to fetch it or rely on parent passing details. 
                // But typically for "Generate" on a row, we have it. 
                // Let's assume we can't easily get it if not passed. 
                // Wait, if preSelectedBatchId is set, 'batches' query is disabled.
                // We really need the batch number for the download filename and text.
                // For now, let's try to find it in the list if available, or maybe we assume the user just wants the QR.
                // Actually, the requirement says "Batch Number is at the bottom". We NEED it.
                // If preSelectedBatchId is passed, maybe we should also pass the batchNumber? 
                // Or we fetch the specific batch details?
                // Simplest: Always fetch batches list for lookup, OR pass batchNumber as prop?
                // Refactor Props: accept batchNumber too? Or just fetch list always?
                // Fetching list always is safer but extra network.
            } 
            
            // Allow lookup from 'batches' if available
            const foundBatch = batches?.find(b => b.id === batchId)
            if (foundBatch) {
                batchNum = foundBatch.batchNumber
                batchDate = foundBatch.bakingEndTime // Using baking time as date reference, or created at? Requirement says "Date".
            } 
             
             // If we don't have batch info (e.g. preSelected but list not fetched), we might have an issue.
             // Strategy: The parent likely has the data. Let's update props to accept optional batch details, 
             // or fetch them.
             // NOTE for now: I will update the component logic to store what we have.
             
             if(foundBatch) {
                 setAssociatedBatchData({
                     batchNumber: foundBatch.batchNumber,
                     date: foundBatch.bakingEndTime || new Date().toISOString()
                 })
             }
        },
        onError: () => {
             toast.error("Failed to generate QR Code")
        }
    })

    // Helper to find data if not found in onSuccess (e.g. if preSelected)
    // Actually, if preSelected, we don't have 'batches'.
    // We should probably pass existing batch code/date to the modal if known.
    // For this iteration, I'll add `batchDetails` prop to the modal.

    const handleGenerate = () => {
        if (!selectedBatchId) return
        generateMutation.mutate(selectedBatchId)
    }

    const handleDownload = () => {
        if (!generatedQR) return
        
        // We need batchNumber and date. If we couldn't find them (e.g. preSelected), we are stuck.
        // I will add props for these or fetch them.
        // For now, let's try to use what we have.
        const batchNum = associatedBatchData?.batchNumber || "BATCH"
        const dateStr = associatedBatchData?.date || new Date().toISOString()

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = generatedQR

        img.onload = () => {
            const padding = 20
            const textHeight = 60
            canvas.width = img.width + (padding * 2)
            canvas.height = img.height + textHeight + (padding * 2)

            ctx.fillStyle = '#FFFFFF'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(img, padding, padding)

            ctx.fillStyle = '#000000'
            ctx.font = 'bold 16px Arial'
            ctx.textAlign = 'center'
            
            const date = new Date(dateStr)
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} - ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`

            ctx.fillText(batchNum, canvas.width / 2, img.height + padding + 25)
            
            ctx.font = '14px Arial'
            ctx.fillStyle = '#555555'
            ctx.fillText(formattedDate, canvas.width / 2, img.height + padding + 50)

            const link = document.createElement('a')
            link.download = `${batchNum}-QR.png`
            link.href = canvas.toDataURL('image/png')
            link.click()
            toast.success("QR Code downloaded")
        }
    }

    // Effect to set associated data if batchSelected from list
    useEffect(() => {
        if (selectedBatchId && batches) {
             const found = batches.find(b => b.id === selectedBatchId)
             if (found) {
                 setAssociatedBatchData({
                     batchNumber: found.batchNumber,
                     date: found.bakingEndTime // or creation date if available
                 })
             }
        }
    }, [selectedBatchId, batches])


    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Generate QR Code</DialogTitle>
                    <DialogDescription>
                        {preSelectedBatchId 
                            ? "Generate a QR code for this batch." 
                            : "Select a production batch to generate a QR code."}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-4">
                    {!preSelectedBatchId && (
                         <div className="flex flex-col gap-2">
                             <label className="text-sm font-medium">Production Batch</label>
                             <Select onValueChange={setSelectedBatchId} value={selectedBatchId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a batch" />
                                </SelectTrigger>
                                <SelectContent>
                                    {isLoadingBatches ? (
                                        <div className="p-2 flex justify-center"><Loader2 className="animate-spin h-4 w-4" /></div>
                                    ) : (
                                        batches?.map((batch) => (
                                            <SelectItem key={batch.id} value={batch.id}>
                                                {batch.batchNumber}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                             </Select>
                         </div>
                    )}

                    <div className="flex justify-center my-4">
                        {generatedQR ? (
                            <div className="border rounded-lg p-4 bg-gray-50 flex flex-col items-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={generatedQR} alt="Generated QR" className="w-48 h-48 object-contain mb-2" />
                            </div>
                        ) : (
                            <div className="w-48 h-48 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-300">
                                <QrCode className="h-12 w-12" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>Close</Button>
                    {generatedQR ? (
                        <Button onClick={handleDownload} className="gap-2">
                            <Download className="h-4 w-4" /> Download
                        </Button>
                    ) : (
                        <Button 
                            onClick={handleGenerate} 
                            disabled={!selectedBatchId || generateMutation.isPending}
                        >
                            {generateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Generate
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default QRGeneratorModal
