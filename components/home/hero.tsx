import React from 'react'
import MainContainer from '../general/maincontainer'
import { Button } from '../ui/button'
import Link from 'next/link'

const HeroComponent = () => {
  return (
    <MainContainer className="relative w-full min-h-screen flex items-center overflow-hidden py-20">
        <div className="flex items-center justify-between w-full gap-8">
          {/* Left Content */}
          <div className="max-w-xl z-10">
            <h1 className="text-5xl lg:text-6xl font-bold text-primary mb-6">
              Your Path to Complete Supply Chain Transparency
            </h1>
            <p className="text-lg text-secondary-foreground mb-8 leading-relaxed">
              Advanced traceability platform designed for modern manufacturers. Track every product journey with precision and build consumer trust.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="px-8 py-6 text-lg">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Right Abstract Shape */}
          <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[500px] opacity-90">
            <div className="relative w-full h-full">
              {/* Abstract gradient shape inspired by the wave pattern */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-300 via-blue-400/40 to-blue-300 rounded-[3rem] transform rotate-12 blur-3xl"></div>
              <div className="absolute inset-0 bg-linear-to-br from-blue-400/30 via-blue-300 to-primary/10 rounded-[3rem] transform -rotate-6"></div>
            </div>
          </div>

          {/* Vertical Text on Far Right */}
          <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 origin-center">
            <p className="text-7xl font-bold text-primary/10 whitespace-nowrap transform rotate-90">
              TraceChain
            </p>
          </div>
        </div>
      </MainContainer>
  )
}

export default HeroComponent
