"use client";

import React from "react";
import {
  Home,
  BookOpen,
  MessageCircle,
  GraduationCap,
  User,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const navigation = [
  {
    name: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Courses Explorer",
    href: "/courses",
    icon: BookOpen,
  },
  {
    name: "Saarthi-Buddy",
    href: "/saarthi-buddy",
    icon: MessageCircle,
  },
  {
    name: "My Learning",
    href: "/my-learning",
    icon: GraduationCap,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-brand-5 border-r border-brand-4">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10  flex items-center justify-center">
            <Image
              src="/logo.jpg"
              alt="NIL"
              className="object-cover rounded-full"
              width={70}
              height={70}
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Saarthi-Learn</h1>
            <p className="text-xs text-gray-300">AI Powered Learning</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                className={cn(
                  "w-full justify-start text-gray-300 hover:text-white hover:bg-brand-4",
                  pathname === item.href && "bg-brand-3 text-white"
                )}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-brand-4 text-gray-300 hover:text-white">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/student-avatar.png" />
                <AvatarFallback className="bg-brand-1 text-white">
                  ST
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">Priya Sharma</p>
                <p className="text-xs text-gray-400">student@example.com</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center">
                <SettingsIcon className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
