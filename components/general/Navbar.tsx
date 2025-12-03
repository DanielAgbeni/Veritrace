import React from 'react'
import MainContainer from './maincontainer'
import Link from 'next/link'
import { Button } from '../ui/button'
import Image from 'next/image'
import { icon } from '@/public/assets'

const Navbar = () => {
  return (
    
      <MainContainer>
        <header className="border-b border-border">
          <div className="w-full px-6 lg:px-12 py-4 flex items-center justify-between">
            <Image src={icon} alt='Veritrace' className='w-40'/>
            <div className="flex items-center gap-4">
              <Link href="/consumer">
                <Button variant="outline">
                  Consumer Portal
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button className="cursor-pointer">
                  Manufacturer Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </header>
      </MainContainer>
   
  )
}

export default Navbar
