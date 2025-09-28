'use client'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useWholeApp } from './AuthContextAPI'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
const OnlyStudentinternshipbyDepartmentTable = () => {
    // console.log(dat)
const {internshipDatawithFiltration,setsemester,semester,page,setpage,totalPages,setsessionYear,setsessionHalf,internshipForAllStudentAsPerDeptLimit,setinternshipForAllStudentAsPerDeptLimit} = useWholeApp()
    
    // console.log(totalPages)
    const handlePageNext = ()=>{
      if(page < totalPages){

        setpage((e)=>e+1)
      }
    }
    const handlePagePrev = ()=>{
      if(page >1){

        setpage((e)=>e-1)
      }
    }
const setnocRequestLimitChanger = (newValue) => {
 
    setinternshipForAllStudentAsPerDeptLimit(newValue);
   
  };
    const currentYear = new Date().getFullYear();
const years = Array.from({ length: 6 }, (_, i) => currentYear - 2 + i)
    // console.log(page)
  return (
    <div>
    <div className='w-full flex items-center justify-evenly flex-wrap'>
        <Select onValueChange={(value) => setsessionYear(value)}>
  <SelectTrigger>
    <SelectValue placeholder="Select Year" />
  </SelectTrigger>
  <SelectContent className='dark'>
    <SelectItem value={null}>All Years</SelectItem>
    {years.map((year) => (
      <SelectGroup key={year}>
       
        <SelectItem value={year}>{year}</SelectItem>
      
      </SelectGroup>
    ))}
  </SelectContent>
</Select>
      <Select onValueChange={(value) => setsessionHalf(value)}>
  <SelectTrigger>
    <SelectValue placeholder="Select Session Half" />
  </SelectTrigger>
  <SelectContent className='dark'>

      <SelectGroup >
        <SelectLabel>Session Half</SelectLabel>
       
        <SelectItem value={null}>All Sessions Half</SelectItem>
        <SelectItem value='Jan-Jun'>Jan-Jun</SelectItem>
        <SelectItem value='Jul-Dec'>Jul-Dec</SelectItem>
      
      </SelectGroup>
 
  </SelectContent>
</Select>
   <Select
 value={semester}
  onValueChange={(value) => {
    setsemester(value); // directly set value
  }}
>
  <SelectTrigger className="w-auto">
    <SelectValue placeholder="Select semester" />
  </SelectTrigger>
  <SelectContent className="dark">
    <SelectGroup>
      <SelectLabel>Semester</SelectLabel>
      <SelectItem value="all">All Semesters</SelectItem>
      <SelectItem value="1">1</SelectItem>
      <SelectItem value="2">2</SelectItem>
      <SelectItem value="3">3</SelectItem>
      <SelectItem value="4">4</SelectItem>
      <SelectItem value="5">5</SelectItem>
      <SelectItem value="6">6</SelectItem>
      <SelectItem value="7">7</SelectItem>
      <SelectItem value="8">8</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
    </div>

      <Table>
  
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Company Name</TableHead>
      <TableHead>Stipend</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Session Year</TableHead>
      <TableHead>Session Half</TableHead>
     
      <TableHead>Job Decscription</TableHead>
      <TableHead>Semester</TableHead>
      <TableHead>Year</TableHead>
      <TableHead>Duration</TableHead>
      <TableHead>Offer Letter</TableHead>
      <TableHead>Created On</TableHead>
     
    </TableRow>
  </TableHeader>
  <TableBody>
    {
        internshipDatawithFiltration?.map((e,index)=>(
           <TableRow className={`${index%2 == 0?'bg-neutral-900' : 'bg-neutral-950' }`} key={e?._id}>
      <TableCell className="font-medium">{e?.companyName}</TableCell>
      <TableCell>{e?.stipend || 0}</TableCell>
      <TableCell>{e?.role}</TableCell>
      <TableCell>{e?.sessionYear}</TableCell>
      <TableCell>{e?.sessionHalf}</TableCell>
      <TableCell className="">{e?.jobDescription}</TableCell>
      <TableCell className="">{e?.semester}</TableCell>
      <TableCell className="">{e?.year}</TableCell>
      <TableCell className="">{e?.duration}</TableCell>
      <TableCell className="text-sky-500 font-semibold hover:underline"><a href={e?.offerletterurl}  rel="noopener noreferrer">Download Here</a></TableCell>
      <TableCell className="">{new Date(e?.createdAt).toDateString()}</TableCell>
    </TableRow>   
        ))
    }
  
  </TableBody>
</Table>
<div  className='flex items-center justify-end w-full pr-4 gap-x-4 '>
   <Select  value={internshipForAllStudentAsPerDeptLimit.toString()} onValueChange={setnocRequestLimitChanger}>
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
  <Pagination>
  <PaginationContent>
    <PaginationItem onClick={handlePagePrev}>
      <PaginationPrevious  />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink >{page}</PaginationLink>
    </PaginationItem>
    <PaginationItem className='flex items-center'>
      <PaginationEllipsis />
      <PaginationLink >{totalPages}</PaginationLink>
    </PaginationItem>
    <PaginationItem onClick={handlePageNext}>
      <PaginationNext />
    </PaginationItem>
  </PaginationContent>
</Pagination>
</div>
</div>
  
    </div>
  )
}

export default OnlyStudentinternshipbyDepartmentTable
