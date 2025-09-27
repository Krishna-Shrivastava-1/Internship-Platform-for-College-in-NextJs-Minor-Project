'use client'
import { useWholeApp } from '@/components/AuthContextAPI'
import OnlyStudentinternshipbyDepartmentTable from '@/components/OnlyStudentinternshipbyDepartmentTable'
import { StudentTable } from '@/components/StudentTable'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  const {fetchedUserData ,handleLogout} = useWholeApp()
  
   
 
  return (
    <div>
      {
        fetchedUserData && fetchedUserData?.user ?
        <div>
 <h1 className='text-white text-center font-semibold text-2xl'>Hi, {fetchedUserData?.user?.name}</h1>
      <h1 className='text-white text-center font-semibold text-xl'>Department of {fetchedUserData?.user?.department}</h1>
          <Button onClick={handleLogout} variant='destructive'>Logout</Button>
  <div className="">
      <h1 className="font-semibold text-lg">All Students with Only Internship</h1>

      <OnlyStudentinternshipbyDepartmentTable  />
     
    </div>
        </div>
        :
        <div className='w-full h-[60vh] flex justify-center items-center'>
          <Loader2 size={30} className='animate-spin' />
        </div>
      }
     
    </div>
  )
}

export default page


 {/* {
        allStudentDeptSpecific && allStudentDeptSpecific.length>0 ?
      

       <div className='w-full flex items-center justify-center '>
          <div className='w-[95%] overflow-x-hidden'>
           <StudentTable />
         </div>
       </div>
        
        :
          <Skeleton className="h-44 w-full" />
      } */}