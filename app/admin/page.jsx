'use client'
import { AdminPageCharts } from '@/components/AdminPageCharts'
import { useWholeApp } from '@/components/AuthContextAPI'
import OnlyStudentinternshipbyDepartmentTable from '@/components/OnlyStudentinternshipbyDepartmentTable'
import SpotlightCard from '@/components/SpotlightCard'
import { StudentTable } from '@/components/StudentTable'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  const {fetchedUserData,internshipStats ,totalInternshipAsPerYear} = useWholeApp()
  // console.log(internshipStats)
  // console.log(totalInternshipAsPerYear)
  return (
    <div className='m-2 mx-3'>
      {
        fetchedUserData && fetchedUserData?.user ?
        <div>
 <h1 className='text-white text-center font-semibold text-2xl'>Hi, {fetchedUserData?.user?.name}</h1>
      <h1 className='text-white text-center font-semibold text-xl'>Department of {fetchedUserData?.user?.department}</h1>
<div className='w-full flex items-center md:flex-nowrap justify-center flex-wrap-reverse'>
   <div className='w-full '>
  <AdminPageCharts />
 </div>
 <div className='text-white'>
{
  totalInternshipAsPerYear?.map((e,index)=>(
    <SpotlightCard key={index}  className="custom-spotlight-card my-2 m-3 text-center md:flex items-center justify-center flex-col" spotlightColor="#332b42">

      <h1 className='text-left text-lg font-semibold'> Total Internship of year {e?.year}</h1>
      <h1 className='font-bold text-xl'>{e?.total}</h1>
</SpotlightCard>
    
  ))
}
 </div>
</div>
  <div className="">
      <h1 className="font-semibold text-lg mt-3">All Students with Only Internship</h1>

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