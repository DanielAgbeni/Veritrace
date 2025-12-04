"use client"
import { icon } from '@/public/assets';
import {
	Activity,
	AlertTriangle,
	BarChart3,
	ChevronLeft,
	ChevronRight,
	HomeIcon,
	Package,
	QrCode,
	Wheat,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const DashboardSideBar = () => {
	const sidebarLinks = [
		{
			label: 'Overview',
			href: '/dashboard',
			icon: <HomeIcon />,
		},
		{ href: '/dashboard/flour-intake', label: 'Flour Intake', icon: <Wheat /> },
		{
			href: '/dashboard/productionbatches',
			label: 'Production Batches',
			icon: <Package />,
		},
		{ href: '/dashboard/qr-codes', label: 'QR Codes', icon: <QrCode /> },
		{
			href: '/dashboard/analytics',
			label: 'Scan Analytics',
			icon: <BarChart3 />,
		},
		{
			href: '/dashboard/fraud-alerts',
			label: 'Fraud Alerts',
			icon: <AlertTriangle />,
		},
		{
			href: '/dashboard/activity-logs',
			label: 'Activity Logs',
			icon: <Activity />,
		},
	];

	const pathname = usePathname();
	const [isCollapsed, setIsCollapsed] = React.useState(false);

	return (
		<aside
			className={`h-full flex flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
				isCollapsed ? 'w-20' : 'w-64'
			} shrink-0`}>
			<div className="p-4 border-b border-gray-100 flex items-center justify-between">
				{!isCollapsed && (
					<div className="flex items-center gap-2">
						<Image
							src={icon}
							alt="Veritrace"
							className="w-32"
						/>
					</div>
				)}
				<button
					onClick={() => setIsCollapsed(!isCollapsed)}
					className={`p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors ${
						isCollapsed ? 'mx-auto' : ''
					}`}>
					{isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
				</button>
			</div>
			<div className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
				{sidebarLinks.map((link) => {
					const isActive = pathname === link.href;
					return (
						<Link
							href={link.href}
							key={link.href}>
							<div
								className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
									isActive
										? 'bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600'
										: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
								} ${isCollapsed ? 'justify-center px-2' : ''}`}>
								{React.cloneElement(link.icon as any, {
									size: 20,
									className: isActive ? 'text-blue-600' : 'text-gray-500',
								})}
								{!isCollapsed && <span className="text-sm">{link.label}</span>}
							</div>
						</Link>
					);
				})}
			</div>
		</aside>
	);
};
export default DashboardSideBar;
