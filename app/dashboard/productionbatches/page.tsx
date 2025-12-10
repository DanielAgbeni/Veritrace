'use client'
import api from '@/api';
import DashboardLayout from '@/components/dashboard/dashboardLayout';
import { Input } from '@/components/ui/input';
import protectRoute from '@/lib/protectedRoutes';
import { createProductionBatch } from '@/lib/productionBatches';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import QRGeneratorModal from '@/components/dashboard/QRGeneratorModal';
import { QrCode } from 'lucide-react';
import React, { useState } from 'react';

const ProductionBatch = () => {
	const fetchProductionBatches = async () => {
		const response = await api.get<ProductionBatchResponseType>(
			'/api/v1/company/getproductionbatches'
		);
		return response.data.data;
	};

	const { data: productionBatches, isLoading } = useQuery({
		queryKey: ['productionBatches'],
		queryFn: fetchProductionBatches,
	});

	const queryClient = useQueryClient();
	const [formData, setFormData] = useState({
		flourBatchId: '',
		bakingStartTime: '',
		bakingEndTime: '',
		ovenTemp: '',
		batchNumber: '',
		quantityProduced: '',
	});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);

	const fetchFlourBatches = async () => {
		const response = await api.get<FlourBatchResponseType>(
			'/api/v1/company/getflourbatches'
		);
		return response.data.data;
	};

	const { data: flourBatches } = useQuery({
		queryKey: ['flourBatches'],
		queryFn: fetchFlourBatches,
	});

	console.log(flourBatches);

	const mutation = useMutation({
		mutationFn: createProductionBatch,
		onSuccess: () => {
			toast.success('Production batch created successfully!');
			queryClient.invalidateQueries({ queryKey: ['productionBatches'] });
			setFormData({
				flourBatchId: '',
				bakingStartTime: '',
				bakingEndTime: '',
				ovenTemp: '',
				batchNumber: '',
				quantityProduced: '',
			});
		},
		onError: (error: any) => {
			console.error('Failed to create production batch:', error);
			toast.error('Failed to create production batch. Please try again.');
		},
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	console.log(formData);

	const handleSubmit = () => {
		if (
			!formData.flourBatchId ||
			!formData.bakingStartTime ||
			!formData.bakingEndTime ||
			!formData.ovenTemp ||
			!formData.batchNumber ||
			!formData.quantityProduced
		) {
			toast.error('Please fill in all fields.');
			return;
		}

		mutation.mutate({
			flourBatchId: formData.flourBatchId,
			bakingStartTime: formData.bakingStartTime,
			bakingEndTime: formData.bakingEndTime,
			ovenTemp: Number(formData.ovenTemp),
			batchNumber: `BATCH-${formData.batchNumber}`,
			quantityProduced: Number(formData.quantityProduced),
		});
	};

	return (
		<DashboardLayout>
			<div className="p-8">
				<header className="mb-8">
					<h2 className="text-2xl font-bold text-gray-800">
						Production Batch Management
					</h2>
					<p className="text-gray-500 mt-1">
						Manage baking schedules and track production status.
					</p>
				</header>

				<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
					<h3 className="text-lg font-semibold text-gray-800 mb-6">
						Create Production Batch
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700">
								Select Flour Batch
							</label>
							<select
								name="flourBatchId"
								value={formData.flourBatchId}
								onChange={handleInputChange}
								className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
								<option value="">Select Flour Batch</option>
								{flourBatches?.map((batch: FlourBatchType) => (
									<option key={batch.id} value={batch.id}>
										{batch.batchNumber} - {batch.flourType}
									</option>
								))}
							</select>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700">
								Baking Start Time
							</label>
							<Input
								type="time"
								name="bakingStartTime"
								value={formData.bakingStartTime}
								onChange={handleInputChange}
								className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700">
								Baking End Time
							</label>
							<Input
								type="time"
								name="bakingEndTime"
								value={formData.bakingEndTime}
								onChange={handleInputChange}
								className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700">
								Oven Temperature (°C)
							</label>
							<Input
								type="number"
								name="ovenTemp"
								value={formData.ovenTemp}
								onChange={handleInputChange}
								placeholder="e.g., 180"
								className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700">
								Batch Number
							</label>
							<div className="relative">
								<span className="absolute left-4 top-2.5 text-gray-500 font-medium">BATCH-</span>
								<Input
									type="text"
									name="batchNumber"
									value={formData.batchNumber}
									onChange={handleInputChange}
									placeholder="105"
									className="w-full pl-18 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
								/>
							</div>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700">
								Quantity Produced
							</label>
							<Input
								type="number"
								name="quantityProduced"
								value={formData.quantityProduced}
								onChange={handleInputChange}
								placeholder="100"
								className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
							/>
						</div>
						<div className="md:col-span-2 pt-2">
							<button
								onClick={handleSubmit}
								disabled={mutation.isPending}
								className="w-full md:w-auto px-8 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
								{mutation.isPending ? 'Creating...' : 'Create Batch'}
							</button>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
					<div className="px-6 py-4 border-b border-gray-100">
						<h3 className="text-lg font-semibold text-gray-800">
							Production Batches
						</h3>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50/50">
								<tr>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
										Batch ID
									</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
										Flour Batch
									</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
										Baking Time
									</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
										Temperature
									</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
										Action
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-100">
								{isLoading ? (
									<tr>
										<td colSpan={5} className="text-center py-4">
											Loading...
										</td>
									</tr>
								) : (
									productionBatches?.map((batch: ProductionBatchType) => (
										<tr
											key={batch.id}
											className="hover:bg-gray-50/50 transition-colors">
											<td className="px-6 py-4 text-sm font-medium text-gray-900">
												{batch.batchNumber}
											</td>
											<td className="px-6 py-4 text-sm text-gray-600">
												{batch.flourBatchId.batchNumber}
											</td>
											<td className="px-6 py-4 text-sm text-gray-600">
												{Math.round(
													(new Date(batch.bakingEndTime).getTime() -
														new Date(batch.bakingStartTime).getTime()) /
													60000
												)}{' '}
												minutes
											</td>
											<td className="px-6 py-4 text-sm text-gray-600">
												{batch.ovenTemp}°C
											</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                <button
                                                    onClick={() => {
                                                        setSelectedBatchId(batch.id)
                                                        setIsModalOpen(true)
                                                    }}
                                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-xs bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors"
                                                >
                                                    <QrCode size={14} />
                                                    Generate QR
                                                </button>
                                            </td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
                <QRGeneratorModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false)
                        setSelectedBatchId(null)
                    }}
                    preSelectedBatchId={selectedBatchId}
                    onSuccess={() => {
                        // Optional: invalidate queries if we tracked 'hasQR' status, but we don't currently.
                        // Just let user download.
                    }}
                />
			</div>
		</DashboardLayout>
	);
};

export default protectRoute(ProductionBatch);