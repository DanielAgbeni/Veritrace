'use client';
import DashboardLayout from '@/components/dashboard/dashboardLayout';
import StatCard from '@/components/general/StatCard';
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
import { useQuery } from '@tanstack/react-query';
import api from '@/api';
import protectRoute from '@/lib/protectedRoutes';

const fetchDashboardStats = async () => {
	const response = await api.get<DashboardResponseType>(
		'/api/v1/company/dashboard'
	);
	return response.data.data;
};

const Dashboard = () => {
	const { data: dashboardData, isLoading } = useQuery({
		queryKey: ['companyDashboard'],
		queryFn: fetchDashboardStats,
	});

	const stats = dashboardData || {
		flourBatches: 0,
		productionBatches: 0,
		totalScans: 0,
	};

	return (
		<DashboardLayout>
			<div className="p-8">
				<header className="mb-8">
					<h2 className="text-2xl font-bold text-gray-800">
						Manufacturer Overview
					</h2>
					<p className="text-gray-500 mt-1">
						Welcome back, here's what's happening today.
					</p>
				</header>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<StatCard
						title="Production Batches"
						value={
							isLoading
								? '...'
								: stats.productionBatches.toString()
						}
						icon={Package}
						color="blue"
					/>
					<StatCard
						title="Flour Batches"
						value={
							isLoading ? '...' : stats.flourBatches.toString()
						}
						icon={Wheat}
						color="green"
					/>
					<StatCard
						title="Total Scans"
						value={isLoading ? '...' : stats.totalScans.toLocaleString()}
						icon={QrCode}
						color="purple"
					/>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
						<div className="flex items-center justify-between mb-6">
							<h3 className="text-lg font-semibold text-gray-800">
								Recent Activity
							</h3>
							<button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
								View All
							</button>
						</div>
						<div className="space-y-4">
							{[1, 2, 3, 4].map((i) => (
								<div
									key={i}
									className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
									<div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
										<Activity
											size={16}
											className="text-green-600"
										/>
									</div>
									<div className="flex-1">
										<p className="text-sm font-medium text-gray-900">
											Batch #{1000 + i} created
										</p>
										<p className="text-xs text-gray-500 mt-0.5">
											{i} hours ago
										</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
						<h3 className="text-lg font-semibold text-gray-800 mb-6">
							Quick Actions
						</h3>
						<div className="space-y-3">
							<button className="w-full flex items-center justify-between px-4 py-4 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
										<Wheat
											size={20}
											className="text-blue-600"
										/>
									</div>
									<div className="text-left">
										<p className="font-medium text-gray-900">
											Record Flour Intake
										</p>
										<p className="text-xs text-gray-500">
											Log new flour shipments
										</p>
									</div>
								</div>
								<div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
									<span className="text-lg leading-none">
										+
									</span>
								</div>
							</button>

							<button className="w-full flex items-center justify-between px-4 py-4 bg-white border border-gray-200 rounded-xl hover:border-green-500 hover:shadow-md transition-all group">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
										<Package
											size={20}
											className="text-green-600"
										/>
									</div>
									<div className="text-left">
										<p className="font-medium text-gray-900">
											Create Production Batch
										</p>
										<p className="text-xs text-gray-500">
											Start a new baking batch
										</p>
									</div>
								</div>
								<div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all">
									<span className="text-lg leading-none">
										+
									</span>
								</div>
							</button>

							<button className="w-full flex items-center justify-between px-4 py-4 bg-white border border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-md transition-all group">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
										<QrCode
											size={20}
											className="text-purple-600"
										/>
									</div>
									<div className="text-left">
										<p className="font-medium text-gray-900">
											Generate QR Codes
										</p>
										<p className="text-xs text-gray-500">
											Create codes for packaging
										</p>
									</div>
								</div>
								<div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-all">
									<span className="text-lg leading-none">
										+
									</span>
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default protectRoute(Dashboard);
