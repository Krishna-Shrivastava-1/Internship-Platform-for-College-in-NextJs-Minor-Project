"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Dock,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  ReceiptText,
  Settings2,
  SquareTerminal,
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


export function StudentAppSidebar({
  ...props
}) {
  const pathname = usePathname();
  const { setOpen } = useSidebar();
  const { fetchedUserData } = useWholeApp();

  // 👉 Close sidebar only on mobile after route change
  React.useEffect(() => {
    const isMobile = window.innerWidth <= 768; // simpler than matchMedia
    if (isMobile) {
      setOpen(false);
    }
  }, [pathname, setOpen]);
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
          title: "Applied NOC",
          url: "/home/applyfornoc",
          icon:Dock
        },
        {
          title: "Enter Internship Detail",
          url: "/home/internship-form",
          icon:ReceiptText
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
    

}
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
