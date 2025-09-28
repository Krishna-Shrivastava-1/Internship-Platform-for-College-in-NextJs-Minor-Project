'use client'
import React, { useState } from "react"
import { useWholeApp } from "./AuthContextAPI"
import axios from "axios"
import { DepartmentSelector } from "./DepartmentSelector"
import { toast } from "sonner"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"

const InternshipForm = () => {
  const { fetchedUserData } = useWholeApp()
  // const [department, setdepartment] = useState('')
  const [session, setsession] = useState('')
  const [file, setfile] = useState(null)
  const [formData, setFormData] = useState({
    companyName: "",
    semester: "",
    year: "",
    stipend: "",
    duration: "",
    location: "",
    workType: "",
    jobDescription: "",
    role: "",
  department: fetchedUserData?.user?.department || "",
 sessionHalf:'',
sessionYear:''

  })
 const currentYear = new Date().getFullYear();
const years = Array.from({ length: 3 }, (_, i) => currentYear - 2 + i)
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
// console.log(session)




  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log("Form Submitted:", formData)
    try {
  const year = Number(formData?.year)
    const semester = Number(formData?.semester)
     if (!file) {

      return toast.warning('Please Select the Resume pdf')

    }
  
  
    
      if (
        (year === 1 && ![1, 2].includes(semester)) ||
        (year === 2 && ![3, 4].includes(semester)) ||
        (year === 3 && ![5, 6].includes(semester)) ||
        (year === 4 && ![7, 8].includes(semester))
      ) {
        toast.warning("Year and Semester is not Consistent")
        return 
      }
      if(!formData?.role){
        toast.warning("Not Filled Role")
        return
      }
       const offerFormData = new FormData();
    offerFormData.append("offerLetter", file);

    // Append all other fields
    Object.keys(formData).forEach((key) => {
      offerFormData.append(key, formData[key]);
    });
      const resp = await axios.post(
      "/api/internshipcollection/fromstudent",
      offerFormData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
      // console.log(resp)
      if (resp.data.success) {
        // alert("Internship submitted successfully!");
        setFormData({
          companyName: "",
          semester: "",
          year: "",
          stipend: "",
          duration: "",
          location: "",
          workType: "",
          jobDescription: "",
          role: "",
department: fetchedUserData?.user?.department || "",
sessionHalf:'',
sessionYear:''
        });
        setfile(null)
        toast.success("Internship submitted successfully!")
      } else {
        alert(resp.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Error submitting internship");
    }
  }

  // console.log("Form:", formData)
  // console.log("File",file)
  return (
    // <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
    //   <h2 className="text-xl font-semibold mb-4">Internship Details</h2>
    //   <form onSubmit={handleSubmit} className="space-y-4">

    //     {/* Company Name */}
    //     <div>
    //       <label className="block mb-1 font-medium">Company Name</label>
    //       <input
    //         type="text"
    //         name="companyName"
    //         value={formData.companyName}
    //         onChange={handleChange}
    //         required
    //         className="w-full border px-3 py-2 rounded-md"
    //       />
    //     </div>

    //     {/* Semester */}
    //     <div>
    //       <label className="block mb-1 font-medium">Semester</label>
    //       <select
    //         name="semester"
    //         value={formData.semester}
    //         onChange={handleChange}
    //         required
    //         className="w-full border px-3 py-2 rounded-md"
    //       >
    //         <option value="">Select Semester</option>
    //         {[1,2,3,4,5,6,7,8].map(num => (
    //           <option key={num} value={num}>{num}</option>
    //         ))}
    //       </select>
    //     </div>

    //     {/* Year */}
    //     <div>
    //       <label className="block mb-1 font-medium">Year</label>
    //       <select
    //         name="year"
    //         value={formData.year}
    //         onChange={handleChange}
    //         required
    //         className="w-full border px-3 py-2 rounded-md"
    //       >
    //         <option value="">Select Year</option>
    //         {[1,2,3,4].map(num => (
    //           <option key={num} value={num}>{num}</option>
    //         ))}
    //       </select>
    //     </div>

    //     {/* Stipend */}
    //     <div>
    //       <label className="block mb-1 font-medium">Stipend</label>
    //       <input
    //         type="number"
    //         name="stipend"
    //         value={formData.stipend}
    //         onChange={handleChange}
    //         className="w-full border px-3 py-2 rounded-md"
    //       />
    //     </div>

    //     {/* Duration */}
    //     <div>
    //       <label className="block mb-1 font-medium">Duration</label>
    //       <input
    //         type="text"
    //         name="duration"
    //         value={formData.duration}
    //         onChange={handleChange}
    //         required
    //         className="w-full border px-3 py-2 rounded-md"
    //       />
    //     </div>

    //     {/* Location */}
    //     <div>
    //       <label className="block mb-1 font-medium">Location</label>
    //       <input
    //         type="text"
    //         name="location"
    //         value={formData.location}
    //         onChange={handleChange}
    //         required
    //         className="w-full border px-3 py-2 rounded-md"
    //       />
    //     </div>

    //     {/* Work Type */}
    //     <div>
    //       <label className="block mb-1 font-medium">Work Type</label>
    //       <select
    //         name="workType"
    //         value={formData.workType}
    //         onChange={handleChange}
    //         className="w-full border px-3 py-2 rounded-md"
    //       >
    //         <option value="">Select Work Type</option>
    //         <option value="Remote">Remote</option>
    //         <option value="Onsite">Onsite</option>
    //         <option value="Hybrid">Hybrid</option>
    //       </select>
    //     </div>

    //     {/* Job Description */}
    //     <div>
    //       <label className="block mb-1 font-medium">Job Description</label>
    //       <textarea
    //         name="jobDescription"
    //         value={formData.jobDescription}
    //         onChange={handleChange}
    //         rows="3"
    //         className="w-full border px-3 py-2 rounded-md"
    //       />
    //     </div>

    //     {/* Role */}
    //     <div>
    //       <label className="block mb-1 font-medium">Role</label>
    //       <input
    //         type="text"
    //         name="role"
    //         value={formData.role}
    //         onChange={handleChange}
    //         className="w-full border px-3 py-2 rounded-md"
    //       />
    //     </div>

    //     {/* Department */}
    //     <div>
    //       <label className="block mb-1 font-medium">Department</label>
    //       <input
    //         type="text"
    //         name="department"
    //         value={formData.department}
    //         onChange={handleChange}
    //         className="w-full border px-3 py-2 rounded-md"
    //       />
    //     </div>

    //     {/* Submit */}
    //     <button
    //       type="submit"
    //       className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
    //     >
    //       Submit
    //     </button>
    //   </form>
    // </div>

    <div className="max-w-2xl mx-auto mt-10 p-6 bg-[#212121] shadow-md rounded-xl text-gray-100">
      <h2 className="text-xl font-semibold mb-4 ">Internship Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Company Name */}
        <div>
          <label className="block mb-1 font-medium">Company Name</label>
          <Input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
           
          />
        </div>

        {/* Semester */}
      <div className="flex justify-around flex-wrap items-center">
          <div>
          <label className="block mb-1 font-medium">Semester</label>
         <Select
  value={formData.semester?.toString() || ""}
  onValueChange={(value) =>
    handleChange({ target: { name: "semester", value } })
  }
>
  <SelectTrigger className="w-[155px]">
    <SelectValue placeholder="Select Semester" />
  </SelectTrigger>
  <SelectContent className="dark">
    <SelectGroup>
      <SelectLabel>Semester</SelectLabel>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
        <SelectItem key={num} value={num.toString()}>
          {num}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>

        </div>

        {/* Year */}
        <div>
          <label className="block mb-1 font-medium">Year</label>
           <Select
  value={formData.year?.toString() || ""}
  onValueChange={(value) =>
    handleChange({ target: { name: "year", value } })
  }
>
  <SelectTrigger className="w-[140px]">
    <SelectValue placeholder="Select year" />
  </SelectTrigger>
  <SelectContent className="dark">
    <SelectGroup>
      <SelectLabel>Year</SelectLabel>
      {[1, 2, 3, 4].map((num) => (
        <SelectItem key={num} value={num.toString()}>
          {num}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>
         
        </div>
          <div>
          <label className="block mb-1 font-medium">Work Type</label>
              <Select
  value={formData.workType?.toString() || ""}
  onValueChange={(value) =>
    handleChange({ target: { name: "workType", value } })
  }
>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select workType" />
  </SelectTrigger>
  <SelectContent className="dark">
    <SelectGroup>
      <SelectLabel>Work Type</SelectLabel>
      {["Remote","Onsite","Hybrid"].map((num) => (
        <SelectItem key={num} value={num.toString()}>
          {num}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>
       
        </div>
          <div>
          <label className="block mb-1 font-medium">Session</label>
               <Select   onValueChange={(value) => {
    const [year, half] = value.split("-");
    const sessionHalf = half.includes("Jan"||"Jun") ? "Jan-Jun" : "Jul-Dec";
// console.log(half)
// console.log(sessionHalf)
    setFormData((prev) => ({
      ...prev,
      sessionYear: Number(year),
      sessionHalf
    }));
  }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Session" />
                </SelectTrigger>
                <SelectContent className='dark'>
                  {years.map((year) => (
                    <SelectGroup key={year}>
                      <SelectLabel>{year}</SelectLabel>
                      <SelectItem value={`${year}-Jan-Jun`}>{year} - Jan-Jun</SelectItem>
                      <SelectItem value={`${year}-Jul-Dec`}>{year} - Jul-Dec</SelectItem>
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
       
        </div>
      </div>

       <div className=" w-full max-w-sm  gap-3 flex items-center ">
                      <Label className='text-md text-wrap' htmlFor="picture">Select Offer Letter in PDF Format</Label>
                      <Input
                        required
                        id='picture'
                        type="file"
                        accept='.pdf'
                        onChange={(e) => setfile(e.target.files?.[0] || null)}
                      />
                    </div>

        {/* Stipend */}
        <div>
          <label className="block mb-1 font-medium">Stipend (in Rs.)</label>
          <Input
            type="number"
            name="stipend"
            value={formData.stipend}
            onChange={handleChange}
           
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-1 font-medium">Duration</label>
          <Input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            // className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

       
      

        {/* Job Description */}
        <div>
          <label className="block mb-1 font-medium">Job Description</label>
          <Textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            rows="3"
            placeholder='Job Description'
            className="w-full  px-3 py-2 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <Input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Department */}
        {/* <DepartmentSelector departmentName={setdepartment} /> */}
        {/* <div>
      <label className="block mb-1 font-medium">Department</label>
      <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        className="w-full bg-gray-800 border border-gray-700 px-3 py-2 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div> */}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>

  )
}

export default InternshipForm
