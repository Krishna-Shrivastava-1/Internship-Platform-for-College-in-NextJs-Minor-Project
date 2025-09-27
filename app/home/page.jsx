'use client'
import { useWholeApp } from '@/components/AuthContextAPI'
import InternshipForm from '@/components/InternshipForm'
import { StudentInternsipDataTable } from '@/components/StudentInternshipDataTable'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
  const { fetchedUserData ,setfetchedUserData } = useWholeApp()
  const [loading, setloading] = useState(true)
  const router = useRouter()
  useEffect(() => {
   if(fetchedUserData && fetchedUserData?.user){
    setloading(false)
   }
  }, [fetchedUserData])
  
  console.log(fetchedUserData?.user?.internshipDetails)
   const handleLogout = async () => {
        try {
            await axios.post("/api/auth/logout");
            setfetchedUserData(null);
             
           window.location.href = "/login"
       
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

 
  return (
    <div>
      {
        loading ?
        <div className='w-full h-[60vh] flex items-center justify-center'>
          <Loader2 size={32} className='animate-spin text-xl' />
        </div>
        :
<div>
   <h1 className='text-white text-center font-semibold text-2xl'>Hi, {fetchedUserData?.user?.name}</h1>
      <h1 className='text-white text-center font-semibold text-xl'>Department of {fetchedUserData?.user?.department}</h1>
      <Button onClick={handleLogout} variant='destructive'>Logout</Button>
      <div className="px-4">
  
      <StudentInternsipDataTable studentInternData={fetchedUserData?.user?.internshipDetails} />
</div>
 </div>
      }
     
   

    {/* {
  fetchedUserData?.user && Array.isArray(fetchedUserData.user.internshipDetails) && fetchedUserData.user.internshipDetails.length > 0
    ? <StudentInternsipDataTable />
    : <Skeleton className='h-36 w-full' />
} */}

     
    </div>
  )
}

export default page
