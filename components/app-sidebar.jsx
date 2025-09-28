"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  CloudUpload,
  Command,
  Dock,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  UserRoundPlus,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { useWholeApp } from "./AuthContextAPI"
import { usePathname } from "next/navigation"




export function AppSidebar({
  ...props
}) {
    const {fetchedUserData} = useWholeApp()
    // console.log(fetchedUserData)
   const pathname = usePathname()
   const { setOpenMobile } = useSidebar() // mobile-specific sidebar state
 
   // Close sidebar on mobile when route changes
   React.useEffect(() => {
     const handleClose = () => {
       const isMobile = window.matchMedia("(max-width: 768px)").matches
       if (isMobile) {
         setOpenMobile(false)
       }
     }
 
     handleClose()
 
     const resizeListener = () => handleClose()
     window.addEventListener("resize", resizeListener)
     return () => window.removeEventListener("resize", resizeListener)
   }, [pathname, setOpenMobile])
  const data = {
    user: {
      name: fetchedUserData?.user?.name,
      email:fetchedUserData?.user?.email,
      avatar: "https://github.com/shadcn.png",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      // {
      //   name: "Acme Corp.",
      //   logo: AudioWaveform,
      //   plan: "Startup",
      // },
      // {
      //   name: "Evil Corp.",
      //   logo: Command,
      //   plan: "Free",
      // },
    ],
    navMain: [
      
          
          {
            title: "Create User",
            url: "/superadmin/create-user",
            icon:UserRoundPlus
          },
          {
            title: "Upload Banner",
            url: "/superadmin/create-banner",
            icon:CloudUpload
          },
          // {
          //   title: "Assign Teachers",
          //   url: "#",
          // },
          // {
          //   title: "Banners",
          //   url: "#",
          // },
        ],
      
      // {
      //   title: "Models",
      //   url: "#",
      //   icon: Bot,
      //   items: [
      //     {
      //       title: "Genesis",
      //       url: "#",
      //     },
      //     {
      //       title: "Explorer",
      //       url: "#",
      //     },
      //     {
      //       title: "Quantum",
      //       url: "#",
      //     },
      //   ],
      // },
      // {
      //   title: "Documentation",
      //   url: "#",
      //   icon: BookOpen,
      //   items: [
      //     {
      //       title: "Introduction",
      //       url: "#",
      //     },
      //     {
      //       title: "Get Started",
      //       url: "#",
      //     },
      //     {
      //       title: "Tutorials",
      //       url: "#",
      //     },
      //     {
      //       title: "Changelog",
      //       url: "#",
      //     },
      //   ],
      // },
    //   {
    //     title: "Settings",
    //     url: "#",
    //     icon: Settings2,
    //     items: [
    //       {
    //         title: "General",
    //         url: "#",
    //       },
    //       {
    //         title: "Team",
    //         url: "#",
    //       },
    //       {
    //         title: "Billing",
    //         url: "#",
    //       },
    //       {
    //         title: "Limits",
    //         url: "#",
    //       },
    //     ],
    //   },
    // ],
    // projects: [
    //   {
    //     name: "Design Engineering",
    //     url: "#",
    //     icon: Frame,
    //   },
    //   {
    //     name: "Sales & Marketing",
    //     url: "#",
    //     icon: PieChart,
    //   },
    //   {
    //     name: "Travel",
    //     url: "#",
    //     icon: Map,
    //   },
  
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} role={fetchedUserData?.user?.role} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
