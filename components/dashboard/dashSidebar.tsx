import { icon } from '@/public/assets';
import {
	Activity,
	AlertTriangle,
	BarChart3,
	HomeIcon,
	Package,
	QrCode,
	Wheat,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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

	return (
		<aside>
			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-2">
					<Image
						src={icon}
						alt="Veritrace"
						className="w-40"
					/>
				</div>
				<div className="flex flex-col gap-2">
					{sidebarLinks.map((link) => (
						<Link
							href={link.href}
							key={link.href}>
							<div className="flex items-center gap-2">
								{link.icon}
								<span>{link.label}</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</aside>
	);
};
export default DashboardSideBar;
