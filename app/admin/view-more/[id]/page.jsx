'use client'
import { useWholeApp } from '@/components/AuthContextAPI'
import InternshipdataofStudentsasperBranch from '@/components/InternshipdataofStudentsasperBranch'
import { Skeleton } from '@/components/ui/skeleton'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {
    const {id} = useParams()
    const pathname = usePathname()
    const {fetchUserDatafromIdinparam,getUserbyId} = useWholeApp()
    
    useEffect(() => {
      if(id){
        fetchUserDatafromIdinparam(id)
      }
      
    }, [id,pathname])
    console.log(getUserbyId)
  return (
    <div className='w-full flex items-center justify-center'>
      <div className='w-[95%]'>
        {
            getUserbyId?.user && getUserbyId?.user?.internshipDetails?.length > 0 ?
       <div>
             <h1>Student Name: {getUserbyId?.user?.name}</h1>
        <InternshipdataofStudentsasperBranch userDetail={getUserbyId} />
       </div>
        :
 <Skeleton className="h-36 w-full" />

        }
      </div>
    </div>
  )
}

export default page
