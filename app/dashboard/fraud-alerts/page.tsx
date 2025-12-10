import { AlertTriangle } from 'lucide-react';
import React from 'react'
import DashboardLayout from '@/components/dashboard/dashboardLayout';

const FraudAlerts = () => {
  return (
    <DashboardLayout>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Fraud Detection & Alerts</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="text-red-600" size={24} />
          <h3 className="text-lg font-semibold text-red-800">Critical Alerts</h3>
        </div>
        <p className="text-3xl font-bold text-red-600">3</p>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="text-yellow-600" size={24} />
          <h3 className="text-lg font-semibold text-yellow-800">Warnings</h3>
        </div>
        <p className="text-3xl font-bold text-yellow-600">7</p>
      </div>
    </div>

    <div className="space-y-4">
      {[
        { severity: 'high', title: 'Flour Batch Mismatch', batch: 'PB-2003', message: 'QR scan detected for batch with unlinked flour source' },
        { severity: 'high', title: 'Temperature Anomaly', batch: 'PB-2005', message: 'Oven temperature recorded at 250°C (exceeds normal range)' },
        { severity: 'medium', title: 'Unusual Scan Pattern', batch: 'PB-2001', message: '50 scans in 5 minutes from same location' },
        { severity: 'medium', title: 'Missing Time Data', batch: 'PB-2007', message: 'Baking end time not recorded within expected timeframe' },
      ].map((alert, i) => (
        <div key={i} className={`bg-white rounded-lg shadow p-6 border-l-4 ${
          alert.severity === 'high' ? 'border-red-500' : 'border-yellow-500'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  alert.severity === 'high' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {alert.severity === 'high' ? 'CRITICAL' : 'WARNING'}
                </span>
                <h4 className="font-semibold text-gray-800">{alert.title}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
              <p className="text-sm text-gray-500">Batch: {alert.batch} • 2 hours ago</p>
            </div>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Investigate
            </button>
          </div>
        </div>
      ))}
    </div>
  </DashboardLayout>
);

   
}

export default FraudAlerts