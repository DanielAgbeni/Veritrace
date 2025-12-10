'use client'
import api from '@/api';
import DashboardLayout from '@/components/dashboard/dashboardLayout';
import { Input } from '@/components/ui/input';
import protectRoute from '@/lib/protectedRoutes';
import { createProductionBatch } from '@/lib/productionBatches';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'sonner';



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
		bakingTime: '',
		bakingEndTime: '',
		ovenTemp: '',
	});

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

	const mutation = useMutation({
		mutationFn: createProductionBatch,
		onSuccess: () => {
			toast.success('Production batch created successfully!');
			queryClient.invalidateQueries({ queryKey: ['productionBatches'] });
			setFormData({
				flourBatchId: '',
				bakingTime: '',
				bakingEndTime: '',
				ovenTemp: '',
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

	const handleSubmit = () => {
		if (
			!formData.flourBatchId ||
			!formData.bakingTime ||
			!formData.bakingEndTime ||
			!formData.ovenTemp
		) {
			toast.error('Please fill in all fields.');
			return;
		}

		const bakingTimeVal = formData.bakingTime; // assuming this is "HH:mm"
		// Calculate duration or pass as is? 
		// The API type expected number for bakingTime, but users input a time of day?
		// Wait, the UI has Baking Start Time and Baking End Time inputs. 
		// But the previous API response showed bakingTime: 5 (number).
		// If bakingTime is duration in hours, I should calculate it or change the input.
		// Assuming user inputs start and end time, I should calculate duration.

		const start = new Date(`1970-01-01T${formData.bakingTime}:00`);
		const end = new Date(`1970-01-01T${formData.bakingEndTime}:00`);
		let diff = (end.getTime() - start.getTime()) / 1000 / 60 / 60; // hours
		if (diff < 0) diff += 24; // Handle overnight

		mutation.mutate({
			flourBatchId: formData.flourBatchId,
			bakingTime: diff,
			ovenTemp: Number(formData.ovenTemp),
			bakingEndTime: formData.bakingEndTime,
			bakingMakeTime: formData.bakingTime,
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
									<option key={batch._id} value={batch._id}>
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
								name="bakingTime"
								value={formData.bakingTime}
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

										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default protectRoute(ProductionBatch);
