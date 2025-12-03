import DashboarsLayout from '@/components/dashboard/dashboardLayout';
import React from 'react';

const FlourIntake = () => {
	return (
		<DashboarsLayout>
			<div>
				<h2 className="text-2xl font-bold text-gray-800 mb-6">
					Flour Intake Management
				</h2>

				<div className="bg-white rounded-lg shadow p-6 mb-6">
					<h3 className="text-lg font-semibold mb-4">Record New Flour Batch</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<input
							type="text"
							placeholder="Flour Type (e.g., Whole Wheat)"
							className="px-4 py-2 border border-gray-300 rounded-lg"
						/>
						<input
							type="text"
							placeholder="Supplier Name"
							className="px-4 py-2 border border-gray-300 rounded-lg"
						/>
						<input
							type="text"
							placeholder="Batch Number"
							className="px-4 py-2 border border-gray-300 rounded-lg"
						/>
						<input
							type="date"
							className="px-4 py-2 border border-gray-300 rounded-lg"
						/>
						<button className="md:col-span-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
							Submit Flour Batch
						</button>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow overflow-hidden">
					<div className="px-6 py-4 border-b border-gray-200">
						<h3 className="text-lg font-semibold">Flour Batch History</h3>
					</div>
					<table className="w-full">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Batch #
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Flour Type
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Supplier
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Date
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{[1, 2, 3].map((i) => (
								<tr
									key={i}
									className="hover:bg-gray-50">
									<td className="px-6 py-4 text-sm">FB-{1000 + i}</td>
									<td className="px-6 py-4 text-sm">Whole Wheat</td>
									<td className="px-6 py-4 text-sm">Golden Mills Ltd.</td>
									<td className="px-6 py-4 text-sm">2024-03-{15 + i}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</DashboarsLayout>
	);
};

export default FlourIntake;
