'use client'
import api from '@/api';
import DashboardLayout from '@/components/dashboard/dashboardLayout';
import protectRoute from '@/lib/protectedRoutes';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const fetchFlourBatches = async () => {
const response = await api.get<FlourBatchResponseType>(
	'/api/v1/company/getflourbatches'
);
return response.data.data;
};
const FlourIntake = () => {

const { data: flourBatches, isLoading } = useQuery({
		queryKey: ['flourBatches'],
		queryFn: fetchFlourBatches,
	});

 const formatDate = (isoString: string): string => {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0'); // 0-based
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};



	return (
		<DashboardLayout>
			<div className="p-8">
				<header className="mb-8">
					<h2 className="text-2xl font-bold text-gray-800">
						Flour Intake Management
					</h2>
					<p className="text-gray-500 mt-1">
						Record and track flour shipments from suppliers.
					</p>
				</header>

				<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
					<h3 className="text-lg font-semibold text-gray-800 mb-6">
						Record New Flour Batch
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700">
								Flour Type
							</label>
							<input
								type="text"
								placeholder="e.g., Whole Wheat"
								className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700">
								Supplier Name
							</label>
							<input
								type="text"
								placeholder="Enter supplier name"
								className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700">
								Batch Number
							</label>
							<input
								type="text"
								placeholder="Enter batch number"
								className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
							/>
						</div>
						<div className="md:col-span-2 pt-2">
							<button className="w-full md:w-auto px-8 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 transition-all">
								Submit Flour Batch
							</button>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
					<div className="px-6 py-4 border-b border-gray-100">
						<h3 className="text-lg font-semibold text-gray-800">
							Flour Batch History
						</h3>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50/50">
								<tr>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
										Batch #
									</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
										Flour Type
									</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
										Supplier
									</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
										Date
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-100">
								{flourBatches?.map((batch) => (
									<tr
										key={batch.batchNumber}
										className="hover:bg-gray-50/50 transition-colors">
										<td className="px-6 py-4 text-sm font-medium text-gray-900">
											FB-{batch.batchNumber}
										</td>
										<td className="px-6 py-4 text-sm text-gray-600">
											{batch.flourType}
										</td>
										<td className="px-6 py-4 text-sm text-gray-600">
											{batch.supplier}
										</td>
										<td className="px-6 py-4 text-sm text-gray-600">
											{formatDate(batch.date)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default protectRoute(FlourIntake);
