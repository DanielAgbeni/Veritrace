import DashboarsLayout from '@/components/dashboard/dashboardLayout';
import StatCard from '@/components/general/StatCard';
import React from 'react';
import {
	BarChart3,
	Package,
	Wheat,
	QrCode,
	AlertTriangle,
	Activity,
	LogOut,
	Home,
	Menu,
	X,
} from 'lucide-react';

const Dashboard = () => {
	return (
		<DashboarsLayout>
			<div>
				<h2 className="text-2xl font-bold text-gray-800 mb-6">
					Manufacturer Overview
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<StatCard
						title="Total Products"
						value="142"
						icon={Package}
						color="blue"
					/>
					<StatCard
						title="Active Batches"
						value="23"
						icon={Wheat}
						color="green"
					/>
					<StatCard
						title="Total Scans"
						value="8,547"
						icon={QrCode}
						color="purple"
					/>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<div className="bg-white rounded-lg shadow p-6">
						<h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
						<div className="space-y-3">
							{[1, 2, 3, 4].map((i) => (
								<div
									key={i}
									className="flex items-center gap-3 p-3 bg-gray-50 rounded">
									<div className="w-2 h-2 bg-green-500 rounded-full"></div>
									<div className="flex-1">
										<p className="text-sm font-medium">
											Batch #{1000 + i} created
										</p>
										<p className="text-xs text-gray-500">{i} hours ago</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6">
						<h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
						<div className="space-y-3">
							<button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
								Record New Flour Intake
							</button>
							<button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
								Create Production Batch
							</button>
							<button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
								Generate QR Codes
							</button>
						</div>
					</div>
				</div>
			</div>
		</DashboarsLayout>
	);
};

export default Dashboard;
