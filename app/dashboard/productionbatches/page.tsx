'use client'
import DashboardLayout from '@/components/dashboard/dashboardLayout';
import protectRoute from '@/lib/protectedRoutes';
import React from 'react';

const ProductionBatch = () => {
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
							<select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
								<option>Select Flour Batch</option>
								<option>FB-1001 - Whole Wheat</option>
								<option>FB-1002 - All Purpose</option>
							</select>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700">
								Baking Start Time
							</label>
							<input
								type="datetime-local"
								className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700">
								Baking End Time
							</label>
							<input
								type="datetime-local"
								className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-700">
								Oven Temperature (°C)
							</label>
							<input
								type="number"
								placeholder="e.g., 180"
								className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
							/>
						</div>
						<div className="md:col-span-2 pt-2">
							<button className="w-full md:w-auto px-8 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-500/20 transition-all">
								Create Batch
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
										Start Time
									</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
										Temperature
									</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
										Status
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-100">
								{[1, 2, 3].map((i) => (
									<tr
										key={i}
										className="hover:bg-gray-50/50 transition-colors">
										<td className="px-6 py-4 text-sm font-medium text-gray-900">
											PB-{2000 + i}
										</td>
										<td className="px-6 py-4 text-sm text-gray-600">
											FB-1001
										</td>
										<td className="px-6 py-4 text-sm text-gray-600">
											2024-03-20 08:00
										</td>
										<td className="px-6 py-4 text-sm text-gray-600">
											180°C
										</td>
										<td className="px-6 py-4">
											<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
												Complete
											</span>
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

export default protectRoute(ProductionBatch);
