'use client'
import { useWholeApp } from '@/components/AuthContextAPI'
import { StudentInternsipDataTable } from '@/components/StudentInternshipDataTable'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const page = () => {
    const {fetchedUserData} = useWholeApp()
    const [loading, setloading] = useState(true)
    useEffect(() => {
      if(fetchedUserData && fetchedUserData?.user){
        setloading(false)
      }
    }, [fetchedUserData])
    
    // console.log(fetchedUserData)
    const sendNocRequest=async (internId) => {
     try {
     const resp =  await axios.post(`/api/noc/createnocrequest`,{
        studentId: fetchedUserData?.user?._id ,
        internshipId :internId ,
        studentDept : fetchedUserData?.user?.department,
      })
      if(resp.data?.success){
        toast.success(resp.data.message)
      }
      if(!resp.data?.success){
          toast.warning(resp.data.message)
      }
    
      // console.log(resp.data)
     } catch (error) {
      console.log(error.message)
     }
    }

  return (
    <div className='m-2 mx-3'>
      <h1>Select Internship for NOC Apply</h1>
      {
        loading ?
        <div className='w-full flex items-center justify-center'>
         <Loader2 className='animate-spin' />
        </div>
        :
        fetchedUserData?.user?.internshipDetails?.length>0?
 <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="">Company Name</TableHead>
            <TableHead>Stipend</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="">Role</TableHead>
            <TableHead className="">Work Type</TableHead>
            <TableHead className="">Semester</TableHead>
            <TableHead className="">Year</TableHead>
            <TableHead className="">Duration</TableHead>
            <TableHead className="">Status</TableHead>
          
          </TableRow>
        </TableHeader>
        <TableBody>

        {fetchedUserData?.user?.internshipDetails?.map((internship) => {
  // find noc that belongs to this internship
const noc = fetchedUserData?.user?.appliednocrequest?.find(
  (n) => String(n?.requestForInternship) === String(internship?._id)
);


  return (
    <TableRow key={internship?._id}>
      <TableCell>{internship?.companyName}</TableCell>
      <TableCell>{internship?.stipend}</TableCell>
      <TableCell>{internship?.location}</TableCell>
      <TableCell>{internship?.role}</TableCell>
      <TableCell>{internship?.workType}</TableCell>
      <TableCell>{internship?.semester}</TableCell>
      <TableCell>{internship?.year}</TableCell>
      <TableCell>{internship?.duration}</TableCell>

      <TableCell>
       {/* <Button onClick={() => sendNocRequest(internship?._id)}>
  Apply
</Button> */}

       <Button
       onClick={() => sendNocRequest(internship?._id)}
  className={
    noc?.approvedornotbyteacher === "Approved"
      ? "bg-green-600 hover:bg-green-700 text-white"
      : noc?.approvedornotbyteacher === "Rejected"
      ? "bg-red-600 hover:bg-red-700 text-white"
      : "bg-neutral-800 hover:bg-neutral-700 text-white"
  }
>
  {noc ? noc.approvedornotbyteacher : "Apply Now"}
</Button>

      </TableCell>
    </TableRow>
  );
})}

        </TableBody>
      </Table>
      :
      <p className='text-center'>No Request for NOC yet.</p>

      }
    </div>
  )
}

export default page
