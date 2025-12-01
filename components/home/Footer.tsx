import React from 'react'
import Link from 'next/link'
import MainContainer from '../general/maincontainer'

const Footer = () => {
  return (
    <MainContainer className="border-t border-border mt-24">
      <div className="w-full mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Veritrace</h3>
            <p className="text-secondary-foreground">
              Building trust through transparency in every supply chain
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-secondary-foreground hover:text-primary">
                  Manufacturer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/consumer" className="text-secondary-foreground hover:text-primary">
                  Consumer Portal
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-primary mb-4">Features</h4>
            <ul className="space-y-2 text-secondary-foreground">
              <li>Product Management</li>
              <li>QR Code Generation</li>
              <li>Shipment Tracking</li>
              <li>Authenticity Verification</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-sm text-secondary-foreground">
            © 2025 Veritrace. All rights reserved.
          </p>
        </div>
      </div>
    </MainContainer>
  )
}

export default Footer
