'use client'
import api from '@/api'
import DashboardLayout from '@/components/dashboard/dashboardLayout'
import protectRoute from '@/lib/protectedRoutes'
import { useQuery } from '@tanstack/react-query'
import { Download, QrCode as QrCodeIcon, Loader2 } from 'lucide-react'
import QRGeneratorModal from '@/components/dashboard/QRGeneratorModal'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface QrCodeType {
    _id: string
    bakingEndTime: string
    batchNumber: string
    createdAt: string
    qrCode?: string // Base64 data string
}

interface QrCodesResponse {
    message: string
    data: QrCodeType[]
}

const QrCodes = () => {
    const fetchQrCodes = async (): Promise<QrCodesResponse> => {
        const response = await api.get('/api/v1/company/qr-codes')
        return response.data
    }

    const { data: qrData, isLoading, error } = useQuery({
        queryKey: ['qr-codes'],
        queryFn: fetchQrCodes
    })

    if (error) {
        toast.error("Failed to load QR codes")
    }

    const handleDownload = (qrCodeData: string | undefined, batchNumber: string, createdAt: string) => {
        if (!qrCodeData) {
            toast.error("QR Code image data missing.")
            return
        }

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = qrCodeData

        img.onload = () => {
            // Set canvas size (standard size + extra for text)
            const padding = 20
            const textHeight = 60
            canvas.width = img.width + (padding * 2)
            canvas.height = img.height + textHeight + (padding * 2)

            // Draw white background
            ctx.fillStyle = '#FFFFFF'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw QR Code
            ctx.drawImage(img, padding, padding)

            // Draw Text
            ctx.fillStyle = '#000000'
            ctx.font = 'bold 16px Arial'
            ctx.textAlign = 'center'
            
            // Format Date: yyyy-mm-dd - hh:mm
            const date = new Date(createdAt)
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} - ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`

            // Batch Number Text
            ctx.fillText(batchNumber, canvas.width / 2, img.height + padding + 25)
            
            // Date Text
            ctx.font = '14px Arial'
            ctx.fillStyle = '#555555'
            ctx.fillText(formattedDate, canvas.width / 2, img.height + padding + 50)

            // Download
            const link = document.createElement('a')
            link.download = `${batchNumber}-QR.png`
            link.href = canvas.toDataURL('image/png')
            link.click()
            toast.success("QR Code downloaded")
        }

        img.onerror = () => {
            toast.error("Failed to process QR Code image.")
        }
    }

    const queryClient = useQueryClient()
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <DashboardLayout>
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">QR Code Management</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center gap-2 transition-colors"
                    >
                        <QrCodeIcon size={16} />
                        Generate New QR
                    </button>
                </div>

                <QRGeneratorModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    preSelectedBatchId={null}
                    onSuccess={() => {
                        queryClient.invalidateQueries({ queryKey: ['qr-codes'] })
                        // Optional: Keep modal open or close? Usually close if successful generation and user is done?
                        // But modal has download button. User might want to download before closing.
                        // So we don't auto close.
                    }}
                />

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
                                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                                <div className="aspect-square bg-gray-200 rounded mb-4"></div>
                                <div className="h-10 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {qrData?.data && qrData.data.length > 0 ? (
                            qrData.data.map((item) => (
                                <div key={item._id} className="bg-white rounded-lg shadow p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-semibold text-gray-800 text-lg">{item.batchNumber}</h4>
                                            <p className="text-sm text-gray-500">
                                                Created: {new Date(item.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 aspect-square rounded-lg flex items-center justify-center mb-4 p-4 border border-gray-100">
                                        {item.qrCode ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img src={item.qrCode} alt="Batch QR Code" className="w-full h-full object-contain" />
                                        ) : (
                                            <div className="flex flex-col items-center text-gray-400">
                                                <QrCodeIcon size={48} className="mb-2 opacity-20" />
                                                <span className="text-xs">No QR Image</span>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleDownload(item.qrCode, item.batchNumber, item.createdAt)}
                                        disabled={!item.qrCode}
                                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                    >
                                       <Download size={16} />
                                       Download QR Code
                                    </button>
                                </div>
                            ))
                        ) : (
                             <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-gray-100 text-center text-gray-500">
                                <QrCodeIcon size={48} className="mb-4 text-gray-300" />
                                <p>No QR codes found.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default protectRoute(QrCodes)