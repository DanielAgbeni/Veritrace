import React, { memo } from 'react';

type StatCardColor = 'blue' | 'green' | 'purple';

interface StatCardProps {
	title: string;
	value: string;
	icon: React.ComponentType<{ size?: number }>;
	color: StatCardColor;
}

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => {
	const colorClasses: Record<StatCardColor, string> = {
		blue: 'bg-blue-50 text-blue-600',
		green: 'bg-green-50 text-green-600',
		purple: 'bg-purple-50 text-purple-600',
	};

	return (
		<div className="bg-white rounded-lg shadow p-6">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-sm font-medium text-gray-500">{title}</h3>
				<div className={`p-2 rounded-lg ${colorClasses[color]}`}>
					<Icon size={20} />
				</div>
			</div>
			<p className="text-3xl font-bold text-gray-800">{value}</p>
		</div>
	);
};

export default memo(StatCard);
