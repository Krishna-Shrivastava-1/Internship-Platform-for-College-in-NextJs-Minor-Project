'use client'

import * as React from "react"
import { Dock, GalleryVerticalEnd } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar } from "@/components/ui/sidebar"
import { TeamSwitcher } from "@/components/team-switcher"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { useWholeApp } from "./AuthContextAPI"
import { usePathname } from "next/navigation"

export function TeacherAppSidebar(props) {
  const { fetchedUserData } = useWholeApp()
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
      email: fetchedUserData?.user?.email,
      avatar: "https://github.com/shadcn.png",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
    ],
    navMain: [
    
      {
        title: "NOC Applications",
        url: "/admin/nocapplication",
        icon: Dock,
      },
    ],
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} role={fetchedUserData?.user?.role} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
