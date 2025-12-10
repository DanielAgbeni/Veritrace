'use client'
import api from '@/api';
import DashboardLayout from '@/components/dashboard/dashboardLayout';
import StatCard from '@/components/general/StatCard'
import { useQuery } from '@tanstack/react-query';
import { BarChart3, Package, QrCodeIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner';

const ScanAnalytics = () => {

    const fetchScanAnalytics = async () => {
        const response = await api.get<ScanAnalyticsResponseType>('/api/v1/company/scan-analytics');
        return response.data.data;
    };

    const { data: analytics, isLoading, isError } = useQuery({
        queryKey: ['scanAnalytics'],
        queryFn: fetchScanAnalytics,
    });

    if (isError) {
        toast.error('Failed to fetch scan analytics');
    }

    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Scan Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {isLoading ? (
                    <>
                         <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
                         <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
                         <div className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
                    </>
                ) : (
                    <>
                        <StatCard 
                            title="Total Scans Today" 
                            value={analytics?.summary.totalScansToday.toString() || "0"} 
                            icon={QrCodeIcon} 
                            color="blue" 
                        />
                        <StatCard 
                            title="Most Scanned Batch" 
                            value={analytics?.summary.mostScannedBatch || "N/A"} 
                            icon={Package} 
                            color="green" 
                        />
                        <StatCard 
                            title="Avg Scans/Batch" 
                            value={analytics?.summary.avgScansPerBatch.toString() || "0"} 
                            icon={BarChart3} 
                            color="purple" 
                        />
                    </>
                )}
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Batch Scan Statistics</h3>
                </div>
                <div className="overflow-x-auto">
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
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">Loading data...</td>
                                </tr>
                            ) : analytics?.tableData && analytics.tableData.length > 0 ? (
                                analytics.tableData.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium">{item.batchId}</td>
                                        <td className="px-6 py-4 text-sm">{item.totalScans}</td>
                                        <td className="px-6 py-4 text-sm">{filterDate(item.lastScan)}</td>
                                        <td className={`px-6 py-4 text-sm ${item.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                            {item.trend}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No scan data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}

const filterDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default ScanAnalytics