import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { useWholeApp } from './AuthContextAPI'

const InternshipdataofStudentsasperBranch = ({userDetail}) => {

//  console.log(userDetail)
  return (
    <div >
      <Table className='dark'>
  {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
  <TableHeader className='dark text-white'>
    <TableRow>
      <TableHead className="w-[100px]">Company Name</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Job Description</TableHead>
      <TableHead className="">Location</TableHead>
      <TableHead className="">Semester</TableHead>
      <TableHead className="">Year</TableHead>
      <TableHead className="">Work Type</TableHead>
      <TableHead className="">Stipend</TableHead>
      <TableHead className="">Duration</TableHead>
    </TableRow>
  </TableHeader>
<TableBody className="dark text-white">
  {userDetail?.user?.internshipDetails?.map((e) => (
  <TableRow key={e?._id} className="dark">
        <TableCell className="font-medium">{e?.companyName}</TableCell>
        <TableCell>{e?.role}</TableCell>
        <TableCell>{e?.jobDescription}</TableCell>
        <TableCell>{e?.location}</TableCell>
        <TableCell>{e?.semester}</TableCell>
        <TableCell>{e?.year}</TableCell>
        <TableCell>{e?.workType}</TableCell>
        <TableCell>{e?.stipend}</TableCell>
        <TableCell>{e?.duration}</TableCell>
      </TableRow>
    ))
  }
</TableBody>

</Table>
    </div>
  )
}

export default InternshipdataofStudentsasperBranch
