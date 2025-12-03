import React from 'react'
import Link from 'next/link'
import MainContainer from '../general/maincontainer'
import { Button } from '../ui/button'

const Cta = () => {
  return (
    <MainContainer className="py-24">
      <div className="bg-linear-to-br from-blue-300 to-white rounded-3xl p-12 lg:p-16 text-center">
        <h2 className="text-4xl font-bold text-primary mb-6">
          Ready to Transform Your Supply Chain?
        </h2>
        <p className="text-lg text-secondary-foreground mb-8 max-w-2xl mx-auto">
          Join leading manufacturers in building transparent, trustworthy supply chains
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 py-6 text-lg">
              Access Dashboard
            </Button>
          </Link>
          <Link href="/consumer">
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
              Try Consumer Portal
            </Button>
          </Link>
        </div>
      </div>
    </MainContainer>
  )
}

export default Cta
