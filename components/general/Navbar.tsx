import React from 'react'
import MainContainer from './maincontainer'
import Link from 'next/link'
import { Button } from '../ui/button'
import Image from 'next/image'
import { icon } from '@/public/assets'

const Navbar = () => {
  return (
    <div>
      <MainContainer>
         <header className="border-b border-gray-100">
        <div className="max-w-480 mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
         <Image src={icon} alt='Veritrace' className='w-40'/>
          <div className="flex items-center gap-4">
            <Link href="/consumer">
              <Button variant="outline" className="border-buttonoutline text-buttonoutline hover:bg-primary hover:text-primaryForeground">
                Consumer Portal
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-primary text-primaryForeground hover:bg-primary/90">
                Manufacturer Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      </MainContainer>
    </div>
  )
}

export default Navbar
