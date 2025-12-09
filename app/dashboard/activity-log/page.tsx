import DashboardLayout from '@/components/dashboard/dashboardLayout';
import { Activity } from 'lucide-react';
import React from 'react'

const ActivityLog = () => {
    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Activity Logs</h2>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Recent Activities</h3>
                        <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                            <option>All Actions</option>
                            <option>Create</option>
                            <option>Update</option>
                            <option>Delete</option>
                        </select>
                    </div>
                </div>

                <div className="divide-y divide-gray-200">
                    {[
                        { action: 'Created production batch PB-2008', user: 'Admin User', time: '5 minutes ago', type: 'create' },
                        { action: 'Updated flour batch FB-1005', user: 'Admin User', time: '1 hour ago', type: 'update' },
                        { action: 'Generated QR codes for batch PB-2007', user: 'Admin User', time: '2 hours ago', type: 'create' },
                        { action: 'Created flour intake FB-1006', user: 'Admin User', time: '3 hours ago', type: 'create' },
                        { action: 'Updated production batch PB-2006', user: 'Admin User', time: '4 hours ago', type: 'update' },
                        { action: 'Created production batch PB-2007', user: 'Admin User', time: '5 hours ago', type: 'create' },
                    ].map((log, i) => (
                        <div key={i} className="px-6 py-4 hover:bg-gray-50">
                            <div className="flex items-start gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${log.type === 'create' ? 'bg-green-100' : 'bg-blue-100'
                                    }`}>
                                    <Activity size={16} className={log.type === 'create' ? 'text-green-600' : 'text-blue-600'} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800">{log.action}</p>
                                    <p className="text-xs text-gray-500 mt-1">{log.user} • {log.time}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );

}

export default ActivityLog