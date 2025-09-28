"use client"

import { ChevronRight, Dock, House } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
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
import Link from "next/link";

export function NavMain({items,role}) {
  const pathname = usePathname()
   const { pendingNOtificationNumber } = useWholeApp()

// console.log(pendingNOtificationNumber?.length)
 
  // const pend = yu.map((e)=>e)

  return (
//     <SidebarGroup>
//       <SidebarGroupLabel>Platform</SidebarGroupLabel>
//       <SidebarMenu>
//         {items.map((item) => (
        
//             <SidebarMenuItem key={item?.title}>
            
//                 <SidebarMenuButton tooltip={item.title}>
//                   {item.icon && <item.icon />}
//                   <span>{item.title}</span>
                
//                 </SidebarMenuButton>
           
             
//               <SidebarMenuSub>
//   {item.items?.map((subItem) => (
//     <SidebarMenuSubItem className="relative" key={subItem.title}>
//       {/* Notification badge */}
//    {
//     subItem?.title === 'NOC Applications' && pendingNOtificationNumber?.length >0 &&   <div className="absolute -top-1 z-20 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-sky-700 text-white text-xs">
//       {pendingNOtificationNumber?.length}
//       </div>
//    }

//       <SidebarMenuSubButton
//         className={pathname === subItem?.url ? "bg-neutral-800 rounded-md" : ""}
//         asChild
//       >
//         <a href={subItem.url}>
//           <span>{subItem.title}</span>
//         </a>
//       </SidebarMenuSubButton>
//     </SidebarMenuSubItem>
//   ))}
// </SidebarMenuSub>

        
//             </SidebarMenuItem>
        
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
     <SidebarGroup className='dark'>
      <SidebarGroupContent className="flex flex-col dark gap-2">
        <SidebarMenu className='dark'>
          <SidebarMenuItem className="flex items-center gap-2">
            <Link className="w-full" href={role === 'teacher' ? '/admin' : role === 'student' ? '/home' :'/superadmin'}>
              <SidebarMenuButton
                tooltip="Home"
                className={`
                  min-w-8 duration-200 ease-linear cursor-pointer
                  ${pathname === '/admin' || pathname === '/home' || pathname === '/superadmin'
                      ? 'bg-neutral-700 hover:bg-neutral-700 text---sidebar-primary-foreground'
              : 'bg-transparent text-gray-300 hover:bg-neutral-800'
                  }
                `}>
                <House />
                <span>Home</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
     
        <SidebarMenu className='dark'>
          {items.map((item) => (
            <SidebarMenuItem className='' key={item.title}>
              <Link className="w-full" href={item.url}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`
                  min-w-8 duration-200 ease-linear cursor-pointer 
                    ${pathname === item.url 
                      ? 'bg-neutral-700 hover:bg-neutral-700 text---sidebar-primary-foreground '
              : 'bg-transparent text-gray-300 hover:bg-neutral-800 relative'
                    }
                  `}>
                   {pathname.startsWith('/admin') && pendingNOtificationNumber?.length > 0  &&   <div className={`${pathname.startsWith('/admin') && pendingNOtificationNumber?.length > 0 && 'absolute top-0 right-0 z-20 w-5 h-5 bg-blue-700 text-center rounded-full text-md'}`}>{pendingNOtificationNumber?.length}</div>}
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
