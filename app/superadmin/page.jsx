'use client'
import { AppSidebar } from "@/components/app-sidebar"
import { useWholeApp } from "@/components/AuthContextAPI"
import { StudentTable } from "@/components/StudentTable"
import { TeacherTable } from "@/components/TeacherTable"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function page() {
  const {handleLogout} = useWholeApp()
  return (
 <div className="">
    <div className="">
      <h1 className="font-semibold text-lg mx-3">All Teachers</h1>
      <Button variant={'destructive'} onClick={handleLogout}>Logout</Button>
       <div className='w-full flex items-center justify-center '>
               <div className='w-[95%] overflow-x-hidden'>
                 <TeacherTable />
              </div>
            </div>
     
    </div>
    <div className="">
      <h1 className="font-semibold text-lg mx-3">All Students with Only Internship</h1>
     <div className='w-full flex items-center justify-center '>
               <div className='w-[95%] overflow-x-hidden'>
                <StudentTable />
              </div>
            </div>
    </div>
 </div>
  )
}
