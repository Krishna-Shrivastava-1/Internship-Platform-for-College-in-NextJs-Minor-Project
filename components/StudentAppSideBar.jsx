"use client";

import React, { useEffect } from "react";
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarRail, useSidebar } from "@/components/ui/sidebar";
import { TeamSwitcher } from "@/components/team-switcher";
import { NavMain } from "@/components/nav-main";
import { usePathname } from "next/navigation";
import { useWholeApp } from "./AuthContextAPI";
import { Dock, GalleryVerticalEnd, ReceiptText } from "lucide-react";
import { NavUser } from "./nav-user";

export function StudentAppSidebar(props) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar(); // mobile-specific sidebar state
  const { fetchedUserData } = useWholeApp();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    const handleClose = () => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (isMobile) {
        setOpenMobile(false);
      }
    };

    handleClose();

    // Optional: close on window resize
    const resizeListener = () => handleClose();
    window.addEventListener("resize", resizeListener);

    return () => window.removeEventListener("resize", resizeListener);
  }, [pathname, setOpenMobile]);

  const data = {
    user: {
      name: fetchedUserData?.user?.name,
      email: fetchedUserData?.user?.email,
      avatar: "https://github.com/shadcn.png",
    },
   teams: [
  {
    name: "Acme Inc",
    logo: GalleryVerticalEnd, // ✅ React component
    plan: "Enterprise",
  },
],
    navMain: [
      {
        title: "Applied NOC",
        url: "/home/applyfornoc",
        icon: Dock,
      },
      {
        title: "Enter Internship Detail",
        url: "/home/internship-form",
        icon: ReceiptText,
      },
    ],
  };

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
  );
}
