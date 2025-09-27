'use client'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { PanelLeft } from 'lucide-react'
const Navbar = () => {
  return (
    <div className='w-full flex items-center justify-center '>
      <div className='w-[90%] sticky top-0 z-40 rounded-full text-white bg-white/5 backdrop-blur-md  p-2 flex justify-between items-center px-4'>
      <div  className='md:hidden flex items-center justify-center'>
          <Sheet>
  <SheetTrigger><PanelLeft size={16} /></SheetTrigger>
  <SheetContent side='left' className='dark'>
    <SheetHeader>
      <SheetTitle>MITS INTERNPORT</SheetTitle>
      <SheetDescription>

          <Link className='hover:cursor-pointer select-none hover:underline' href={'/home/applyfornoc'}>Apply For NOC</Link>
          <hr />
           {/* <Separator className='' /> */}
          <Link className='hover:cursor-pointer select-none hover:underline' href={'/home/applyfornoc'}>Blogs</Link>
          <hr />
           {/* <Separator className='' /> */}
          <Link className='hover:cursor-pointer select-none hover:underline' href={'/home/applyfornoc'}>Gate Resources</Link>
      
      </SheetDescription>
 
    </SheetHeader>
  </SheetContent>
</Sheet>
      </div>
    
        <h1 className='font-semibold'>MITS INTERNPORT</h1>
        <div className=' hidden md:flex items-center justify-center gap-x-4 h-6 font-semibold'>
          <Link className='hover:cursor-pointer select-none hover:underline' href={'/home/applyfornoc'}>Apply For NOC</Link>
           <Separator className='' orientation="vertical" />
          <Link className='hover:cursor-pointer select-none hover:underline' href={'/home/applyfornoc'}>Blogs</Link>
           <Separator className='' orientation="vertical" />
          <Link className='hover:cursor-pointer select-none hover:underline' href={'/home/applyfornoc'}>Gate Resources</Link>
        </div>
        <Link href={'/login'}>
          <Button  className='rounded-full dark font-semibold cursor-pointer select-none'>Get Started</Button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
