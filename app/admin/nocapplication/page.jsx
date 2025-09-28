'use client'
import { useWholeApp } from '@/components/AuthContextAPI'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const page = () => {
  const { userId,fetchNocRequest , nocRequest,setnocRequest, setnocRequestPages, setnocRequestLimit,nocRequestLimit,nocRequestPages} = useWholeApp()

  const pathname = usePathname()
const [loading, setloading] = useState(true)
  // const fetchNocRequest = async () => {
  //   if (userId?.id) {
  //     const resp = await axios.get(`/api/noc/getnocrequestforcordinatorteacher/${userId?.id}`)
  //     setnocRequest(resp?.data)
  //     setloading(false)
  //   }
  // }
  useEffect(() => {
    if (userId?.id) {
      fetchNocRequest(userId?.id)
      setloading(false)
    }
  }, [userId,pathname])
  // console.log(nocRequest?.totalPages)
   const handlePageNext = ()=>{
      if(nocRequestPages < nocRequest?.totalPages){

        setnocRequestPages((e)=>e+1)
      }
    }
    const handlePagePrev = ()=>{
      if(nocRequestPages >1){

        setnocRequestPages((e)=>e-1)
      }
    }

  
  // const yu = nocRequest?.nocs?.filter((e) => (
  //   e?.approvedornotbyteacher === 'Pending'
  // ))
  // const pend = yu?.map((e)=>e)
  // console.log(pend)

const handleApprove = async (id) => {
  try {
    const resp = await axios.put(`/api/noc/approveorrejectrequestofnoc/${id}`, {
      textVerdict: "Approved"
    });
     setnocRequest((prev) => ({
      ...prev,
      nocs: prev.nocs.map((n) =>
        n._id === id ? { ...n, approvedornotbyteacher: "Approved" } : n
      ),
    }));
    toast.success("You have Approved this NOC");
  } catch (err) {
    toast.error("Error approving NOC");
  }
};

const handleNotApprove = async (id) => {
  try {
    const resp = await axios.put(`/api/noc/approveorrejectrequestofnoc/${id}`, {
      textVerdict: "Rejected"
    });
      setnocRequest((prev) => ({
      ...prev,
      nocs: prev.nocs.map((n) =>
        n._id === id ? { ...n, approvedornotbyteacher: "Rejected" } : n
      ),
    }));
    toast.success("You have Rejected this NOC");
  } catch (err) {
    toast.error("Error rejecting NOC");
  }
};

const setnocRequestLimitChanger = (newValue) => {
 
    setnocRequestLimit(newValue);
   
  };
console.log(nocRequest)
  return (
    <div className='m-2 mx-3'>
    {
      loading?
       <div className='w-full h-[60vh] flex justify-center items-center'>
          <Loader2 size={30} className='animate-spin' />
        </div>
      :
       <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="">Status</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="">Company Name</TableHead>
            <TableHead className="">Semester</TableHead>
            <TableHead className="">Year</TableHead>
            <TableHead className="">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {
            nocRequest?.nocs?.map((e) => (

              <TableRow key={e?._id}>
                <TableCell className={` ${e?.approvedornotbyteacher === 'Approved' ? 'text-green-500':e?.approvedornotbyteacher === 'Rejected' ? 'text-red-600' : 'text-orange-600'} font-semibold`}>{e?.approvedornotbyteacher}</TableCell>
                <TableCell>{e?.student?.name}</TableCell>
                <TableCell>{e?.student?.department}</TableCell>
                <TableCell className="">{e?.requestForInternship?.companyName}</TableCell>
                <TableCell className="">{e?.requestForInternship?.semester}</TableCell>
                <TableCell className="">{e?.requestForInternship?.year}</TableCell>
                <TableCell className="">{new Date(e?.requestForInternship?.createdAt).toDateString()}</TableCell>
                <TableCell>
                  <Dialog className='dark text-white'>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">Review</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md dark text-white">
                      <DialogHeader>
                        <DialogTitle>Review NOC Request</DialogTitle>
                        <DialogDescription>
                          Please review details before approving or rejecting this request.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-2">
                        <p><span className="font-semibold">Student:</span> {e?.student?.name}</p>
                        <p><span className="font-semibold">Department:</span> {e?.student?.department}</p>
                        <p><span className="font-semibold">Company:</span> {e?.requestForInternship?.companyName}</p>
                        <p><span className="font-semibold">Semester:</span> {e?.requestForInternship?.semester}</p>
                        <p><span className="font-semibold">Year:</span> {e?.requestForInternship?.year}</p>
                        <p><span className="font-semibold">Duration:</span> {e?.requestForInternship?.duration}</p>
                        <p><span className="font-semibold">Role:</span> {e?.requestForInternship?.role}</p>
                      </div>

                      <DialogFooter className="flex justify-end space-x-2">
                        <Button
                          variant="success"
                          onClick={() => handleApprove(e._id)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleNotApprove(e._id)}
                        >
                          Reject
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>

              </TableRow>

            ))
          }
        </TableBody>
      </Table>
    }
    <div className='flex items-center justify-end w-full pr-4 gap-x-4 '>
      <Select  value={nocRequestLimit.toString()} onValueChange={setnocRequestLimitChanger}>
  <SelectTrigger className="w-[70px]">
    <SelectValue  placeholder="Limit" />
  </SelectTrigger>
  <SelectContent className='dark'>
    <SelectItem value="10">10</SelectItem>
    <SelectItem value="30">30</SelectItem>
    <SelectItem value="50">50</SelectItem>
  </SelectContent>
</Select>
 <div>
   <Pagination >
  <PaginationContent>
    <PaginationItem onClick={handlePagePrev}>
      <PaginationPrevious className='cursor-pointer select-none' />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink >{nocRequestPages}</PaginationLink>
    </PaginationItem>
    <PaginationItem className='flex items-center'>
      <PaginationEllipsis />
      <PaginationLink >{nocRequest?.totalPages}</PaginationLink>
    </PaginationItem>
    <PaginationItem onClick={handlePageNext}>
      <PaginationNext className='cursor-pointer select-none' />
    </PaginationItem>
  </PaginationContent>
</Pagination>
 </div>
    </div>
   


    </div>
  )
}

export default page
