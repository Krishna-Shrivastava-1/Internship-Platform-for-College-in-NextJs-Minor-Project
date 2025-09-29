import { AppSidebar } from "@/components/app-sidebar"
import { TeacherAppSidebar } from "@/components/teacherappsidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function AdminPage({children}) {
  return (
    <SidebarProvider className='dark'>
      {/* <AppSidebar /> */}
      <TeacherAppSidebar />
      <SidebarInset>
        <header style={{zIndex:'20'}} className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 backdrop-blur-md">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  {/* <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink> */}
                {/* </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem> */}
                  {/* <BreadcrumbPage>Data Fetching</BreadcrumbPage> */}
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="text-white">
        {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
