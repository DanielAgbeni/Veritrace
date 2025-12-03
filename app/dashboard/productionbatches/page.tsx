import DashboarsLayout from '@/components/dashboard/dashboardLayout';
import React from 'react';

const ProductionBatch = () => {
	return (
		<DashboarsLayout>
			<div>
				<h2 className="text-2xl font-bold text-gray-800 mb-6">
					Production Batch Management
				</h2>

				<div className="bg-white rounded-lg shadow p-6 mb-6">
					<h3 className="text-lg font-semibold mb-4">
						Create Production Batch
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<select className="px-4 py-2 border border-gray-300 rounded-lg">
							<option>Select Flour Batch</option>
							<option>FB-1001 - Whole Wheat</option>
							<option>FB-1002 - All Purpose</option>
						</select>
						<input
							type="datetime-local"
							placeholder="Baking Start Time"
							className="px-4 py-2 border border-gray-300 rounded-lg"
						/>
						<input
							type="datetime-local"
							placeholder="Baking End Time"
							className="px-4 py-2 border border-gray-300 rounded-lg"
						/>
						<input
							type="number"
							placeholder="Oven Temperature (°C)"
							className="px-4 py-2 border border-gray-300 rounded-lg"
						/>
						<button className="md:col-span-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
							Create Batch
						</button>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow overflow-hidden">
					<div className="px-6 py-4 border-b border-gray-200">
						<h3 className="text-lg font-semibold">Production Batches</h3>
					</div>
					<table className="w-full">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Batch ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Flour Batch
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Start Time
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Temperature
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Status
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{[1, 2, 3].map((i) => (
								<tr
									key={i}
									className="hover:bg-gray-50">
									<td className="px-6 py-4 text-sm font-medium">
										PB-{2000 + i}
									</td>
									<td className="px-6 py-4 text-sm">FB-1001</td>
									<td className="px-6 py-4 text-sm">2024-03-20 08:00</td>
									<td className="px-6 py-4 text-sm">180°C</td>
									<td className="px-6 py-4">
										<span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
											Complete
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</DashboarsLayout>
	);
};

export default ProductionBatch;
