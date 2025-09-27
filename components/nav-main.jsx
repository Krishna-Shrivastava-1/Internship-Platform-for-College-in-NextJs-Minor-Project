"use client"

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";
import { useWholeApp } from "./AuthContextAPI";
import { useEffect, useState } from "react";
import axios from "axios";

export function NavMain({
  items
}) {
  const pathname = usePathname()
   const { pendingNOtificationNumber } = useWholeApp()


 
  // const pend = yu.map((e)=>e)

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight
                    className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
              <SidebarMenuSub>
  {item.items?.map((subItem) => (
    <SidebarMenuSubItem className="relative" key={subItem.title}>
      {/* Notification badge */}
   {
    subItem?.title === 'NOC Applications' && pendingNOtificationNumber?.length >0 &&   <div className="absolute -top-1 z-20 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-sky-700 text-white text-xs">
      {pendingNOtificationNumber?.length}
      </div>
   }

      <SidebarMenuSubButton
        className={pathname === subItem?.url ? "bg-neutral-800 rounded-md" : ""}
        asChild
      >
        <a href={subItem.url}>
          <span>{subItem.title}</span>
        </a>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  ))}
</SidebarMenuSub>

              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
