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
  console.log(user)
  return (
    
      <MainContainer>
        <header className="border-b border-border">
          <div className="w-full px-6 lg:px-12 py-4 flex items-center justify-between">
            <Image src={icon} alt='Veritrace' className='w-40'/>
            <div className="flex items-center gap-4">
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
          </div>
        </header>
      </MainContainer>
   
  )
}

export default Navbar
