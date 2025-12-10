'use client'
import api from '@/api';
import DashboardLayout from '@/components/dashboard/dashboardLayout';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

const FraudAlerts = () => {
    const getFraudAlerts = async (): Promise<FraudAlertResponseType> => {
        const response = await api.get('/api/v1/company/fraud-alerts');
        return response.data;
    };

    const { data: alertsData, isLoading, error } = useQuery({
        queryKey: ['fraud-alerts'],
        queryFn: getFraudAlerts,
    });

    if (error) {
        toast.error("Failed to load fraud alerts");
    }

    const alerts = alertsData?.data || [];
    const criticalCount = alerts.filter(a => a.severity === 'HIGH').length;
    const warningCount = alerts.filter(a => a.severity !== 'HIGH').length;

    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Fraud Detection & Alerts</h2>
        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="text-red-600" size={24} />
                        <h3 className="text-lg font-semibold text-red-800">Critical Alerts</h3>
                    </div>
                    {isLoading ? (
                         <div className="h-9 w-12 bg-red-200 animate-pulse rounded" />
                    ) : (
                        <p className="text-3xl font-bold text-red-600">{criticalCount}</p>
                    )}
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="text-yellow-600" size={24} />
                        <h3 className="text-lg font-semibold text-yellow-800">Warnings</h3>
                    </div>
                     {isLoading ? (
                         <div className="h-9 w-12 bg-yellow-200 animate-pulse rounded" />
                    ) : (
                        <p className="text-3xl font-bold text-yellow-600">{warningCount}</p>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-lg shadow p-6 border-l-4 border-gray-200 animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                             <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    ))
                ) : alerts.length > 0 ? (
                    alerts.map((alert) => (
                        <div key={alert._id} className={`bg-white rounded-lg shadow p-6 border-l-4 ${
                            alert.severity === 'HIGH' ? 'border-red-500' : 'border-yellow-500'
                        }`}>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                                            alert.severity === 'HIGH' 
                                                ? 'bg-red-100 text-red-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {alert.severity}
                                        </span>
                                        {/* Title inferred or just use severity as title if no specific title in data */}
                                         {/* The data doesn't have a 'title' field, so we might need to derive it or just show message */}
                                        <h4 className="font-semibold text-gray-800">
                                            {alert.severity === 'HIGH' ? 'Critical Issue Detected' : 'Warning'}
                                        </h4>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                                    <p className="text-sm text-gray-500">
                                        Batch: {alert.batchId.batchNumber} • {new Date(alert.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-gray-100 text-center">
                        <div className="bg-green-50 p-4 rounded-full mb-4">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">No Fraud Alerts</h3>
                        <p className="text-gray-500 mt-1 max-w-sm">
                            Great news! No suspicious activities or fraud alerts have been detected recently.
                        </p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

export default FraudAlerts;