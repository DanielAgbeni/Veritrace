import DashboardLayout from '@/components/dashboard/dashboardLayout';
import StatCard from '@/components/general/StatCard'
import { BarChart3, Package, QrCodeIcon } from 'lucide-react'
import React from 'react'

const ScanAnalytics = () => {



    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Scan Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <StatCard title="Total Scans Today" value="324" icon={QrCodeIcon} color="blue" />
                <StatCard title="Most Scanned Batch" value="PB-2001" icon={Package} color="green" />
                <StatCard title="Avg Scans/Batch" value="142" icon={BarChart3} color="purple" />
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Batch Scan Statistics</h3>
                </div>
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Batch ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Scans</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Scan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trend</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {[1, 2, 3, 4, 5].map(i => (
                            <tr key={i} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium">PB-{2000 + i}</td>
                                <td className="px-6 py-4 text-sm">{120 + i * 15}</td>
                                <td className="px-6 py-4 text-sm">{i} hours ago</td>
                                <td className="px-6 py-4 text-sm text-green-600">↑ +{5 + i}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );


}

export default ScanAnalytics