"use client"

import React from "react"
import {
  faGear,
  faImage,
  faLayerGroup,
  faMusic,
  faComments,
  faIdCardClip,
} from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Separator } from "../ui/separator"
import CreditCounter from "./creditCounter"

interface Props {
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  detectSlideStart: (e: React.TouchEvent<HTMLDivElement>) => void
  detectSlideEnd: (e: React.TouchEvent<HTMLDivElement>) => void
}

export interface HarperRoute {
  label: string
  Icon: (color: string) => React.JSX.Element
  href: string
  color: string
}

export const routes: HarperRoute[] = [
  {
    label: "Conversation",
    href: "/conversation",
    color: "text-routes-conversation",
    Icon: (color: string) => (
      <FontAwesomeIcon icon={faComments} className={`${color} text-xl w-8`} />
    ),
  },
  {
    label: "Composer",
    href: "/composer",
    color: "text-routes-composer",
    Icon: (color: string) => (
      <FontAwesomeIcon icon={faMusic} className={`${color} text-xl w-8`} />
    ),
  },
  {
    label: "Illustrator",
    href: "/illustrator",
    color: "text-routes-illustrator",
    Icon: (color: string) => (
      <FontAwesomeIcon icon={faImage} className={`${color} text-xl w-8`} />
    ),
  },
  {
    label: "Impression",
    href: "/impression",
    color: "text-routes-impression",
    Icon: (color: string) => (
      <FontAwesomeIcon icon={faIdCardClip} className={`${color} text-xl w-8`} />
    ),
  },
]

const SidebarLink = ({ href, label, color, Icon }: HarperRoute) => {
  const pathname = usePathname()
  return (
    <Link
      key={href}
      href={href}
      className={cn(
        "flex items-center justify-start rounded-lg gap-x-2 hover:bg-primary-100 px-2 py-2",
        pathname === href && "bg-primary-100"
      )}
    >
      {Icon(color)}
      <h2 className="text-white text-lg">{label}</h2>
    </Link>
  )
}

const Sidebar: React.FC<Props> = ({
  isSidebarOpen,
  detectSlideStart,
  detectSlideEnd,
}) => {
  return (
    <div
      className={[
        "absolute top-0 md:relative h-full flex flex-col justify-between py-4 w-72 bg-primary-300 transition-all duration-300 ease-in-out overflow-hidden z-20",
        isSidebarOpen ? "left-0 md:left-auto" : "-left-full md:left-auto",
      ].join(" ")}
      onTouchStart={detectSlideStart}
      onTouchEnd={detectSlideEnd}
    >
      <div className="flex flex-col gap-y-2 px-2 py-8 overflow-auto">
        <SidebarLink
          label="Dashboard"
          href="/dashboard"
          color="text-routes-dashboard"
          Icon={(color: string) => (
            <FontAwesomeIcon
              icon={faLayerGroup}
              className={`${color} text-xl w-8`}
            />
          )}
        />
        <Separator className="px-2 bg-gray-600" />
        <h1 className="text-gray-400 ml-2 font-light text-sm">Tools</h1>
        {routes.map((route) => (
          <SidebarLink key={route.href} {...route} />
        ))}
        <Separator className="px-2 bg-gray-600" />
        <SidebarLink
          label="Settings"
          href="/settings"
          color="text-routes-settings"
          Icon={(color: string) => (
            <FontAwesomeIcon icon={faGear} className={`${color} text-xl w-8`} />
          )}
        />
      </div>
      <div className="flex flex-col px-2 gap-y-2">
        <CreditCounter />
        {/* <p className="text-white text-center w-full">
          Made with Passion &#10084;
        </p> */}
      </div>
    </div>
  )
}

export default Sidebar
