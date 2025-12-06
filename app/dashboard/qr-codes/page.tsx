import DashboardLayout from '@/components/dashboard/dashboardLayout'
import protectRoute from '@/lib/protectedRoutes'
import { QrCode } from 'lucide-react'

const QrCodes = () => {
  return (
    <DashboardLayout>
        <div className="p-8">

    <h2 className="text-2xl font-bold text-gray-800 mb-6">QR Code Management</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-semibold text-gray-800">Batch PB-{2000 + i}</h4>
              <p className="text-sm text-gray-500">Flour: FB-1001</p>
            </div>
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Active</span>
          </div>
          
          <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center mb-4">
            <QrCode size={120} className="text-gray-400" />
          </div>
          
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
            Download QR Code
          </button>
        </div>
      ))}
    </div>
        </div>
  </DashboardLayout>
  )
}

export default protectRoute(QrCodes)