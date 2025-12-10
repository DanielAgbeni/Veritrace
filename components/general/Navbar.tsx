'use client'
import React from 'react'
import MainContainer from './maincontainer'
import Link from 'next/link'
import { Button } from '../ui/button'
import Image from 'next/image'
import { icon } from '@/public/assets'
import { useStore } from '@/lib/useStore'

const Navbar = () => {
  const {user} = useStore()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <MainContainer>
      <header className="border-b border-border bg-background relative z-50">
        <div className="w-full px-6 lg:px-12 py-4 flex items-center justify-between">
          <Image src={icon} alt='Veritrace' className='w-32 lg:w-40'/>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/scan-product">
              <Button variant="outline">
                Scan Product
              </Button>
            </Link>
            <Link href={user ? "/dashboard" : "/auth/login"}>
              <Button className="cursor-pointer">
                {user ? (
                  <div className="flex items-center gap-2">
                      {user.logo && <Image src={user.logo} alt="User Logo" width={24} height={24} className="rounded-full" />}
                      <span>Dashboard</span>
                  </div>
                ) : (
                  "Manufacturer Dashboard"
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               {isMenuOpen ? (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               ) : (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
               )}
             </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
            <Link href="/scan-product" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center">
                Scan Product
              </Button>
            </Link>
            <Link href={user ? "/dashboard" : "/auth/login"} onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full justify-center">
                {user ? (
                   <div className="flex items-center gap-2">
                      {user.logo && <Image src={user.logo} alt="User Logo" width={24} height={24} className="rounded-full" />}
                      <span>Dashboard</span>
                   </div>
                ) : (
                  "Manufacturer Dashboard"
                )}
              </Button>
            </Link>
          </div>
        )}
      </header>
    </MainContainer>
  )
}

export default Navbar
