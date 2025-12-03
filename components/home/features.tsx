import React from 'react'
import MainContainer from '../general/maincontainer'
import { Package, Scan, Shield, TruckIcon } from 'lucide-react'

const Features = () => {
  return (
    <MainContainer>
       
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Complete Traceability Solution
          </h2>
          <p className="text-lg text-secondary-foreground max-w-2xl mx-auto">
            Everything you need to track, verify, and showcase your supply chain integrity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-blue-300 rounded-xl flex items-center justify-center mb-6">
              <Package className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">
              Product Management
            </h3>
            <p className="text-secondary-foreground">
              Create and manage products with unique identifiers and detailed information
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-blue-300 rounded-xl flex items-center justify-center mb-6">
              <Scan className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">
              QR Code Generation
            </h3>
            <p className="text-secondary-foreground">
              Automatically generate unique QR codes for every product in your inventory
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-blue-300 rounded-xl flex items-center justify-center mb-6">
              <TruckIcon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">
              Shipment Tracking
            </h3>
            <p className="text-secondary-foreground">
              Monitor shipments in real-time with GPS tracking and status updates
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-blue-300 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-3">
              Consumer Verification
            </h3>
            <p className="text-secondary-foreground">
              Enable customers to verify authenticity and view complete product journey
            </p>
          </div>
        </div>
    </MainContainer>
  )
}

export default Features
