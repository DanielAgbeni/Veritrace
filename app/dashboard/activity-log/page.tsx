'use client'
import api from '@/api';
import DashboardLayout from '@/components/dashboard/dashboardLayout';
import { useQuery } from '@tanstack/react-query';
import { Activity } from 'lucide-react';
import { toast } from 'sonner';

const ActivityLog = () => {


 const getActivityLogs = async (): Promise<ActivityLogResponseType> => {
	const response = await api.get('/api/v1/company/activity-logs');
	return response.data;
};


    const { data, isLoading, error } = useQuery({
        queryKey: ['activity-logs'],
        queryFn: getActivityLogs,
    });

    if (error) {
        toast.error("Failed to load activity logs");
    }

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
                    {isLoading ? (
                        // Loading Skeleton
                        Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="px-6 py-4 animate-pulse">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                                        <div className="h-3 bg-gray-200 rounded w-1/4" />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : data?.data && data.data.length > 0 ? (
                        data.data.map((log, i) => (
                            <div key={i} className="px-6 py-4 hover:bg-gray-50">
                                <div className="flex items-start gap-4">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        log.type === 'create' ? 'bg-green-100' : 
                                        log.type === 'update' ? 'bg-blue-100' : 'bg-red-100'
                                    }`}>
                                        <Activity size={16} className={
                                            log.type === 'create' ? 'text-green-600' : 
                                            log.type === 'update' ? 'text-blue-600' : 'text-red-600'
                                        } />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800">{log.action}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {log.user} • {new Date(log.createdAt).toLocaleDateString()} {new Date(log.createdAt).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-6 py-8 text-center text-gray-500">
                            No activity logs found.
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

export default ActivityLog;