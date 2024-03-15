/** @format */
"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";
import React from "react";

type Props = {};

import {
  ShoppingCart,
  List,
  Library,
  Settings,
  ChevronRight,
  Inbox,
  Home,
  User,
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3  pb-10 pt-24 ">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "All listings",
            href: "/",
            icon: List,
            variant: "default",
          },
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: Library,
            variant: "ghost",
          },
          {
            title: "My listings",
            href: "/listings",
            icon: Inbox,
            variant: "ghost",
          },
          {
            title: "My rentals",
            href: "/rentals",
            icon: Home,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "/settings",
            icon: Settings,
            variant: "ghost",
          },
          {
            title: "My people",
            href: "/people",
            icon: User,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
