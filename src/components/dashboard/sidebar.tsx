import React from "react"
import { faGear, faLayerGroup } from "@fortawesome/free-solid-svg-icons"
import { faComments } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

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
    label: "Dashboard",
    href: "/dashboard",
    color: "text-routes-dashboard",
    Icon: (color: string) => (
      <FontAwesomeIcon icon={faLayerGroup} className={`${color} text-xl w-8`} />
    ),
  },
  {
    label: "Conversation",
    href: "/conversation",
    color: "text-routes-conversation",
    Icon: (color: string) => (
      <FontAwesomeIcon icon={faComments} className={`${color} text-xl w-8`} />
    ),
  },
  {
    label: "Settings",
    href: "/settings",
    color: "text-routes-settings",
    Icon: (color: string) => (
      <FontAwesomeIcon icon={faGear} className={`${color} text-xl w-8`} />
    ),
  },
]

const Sidebar: React.FC<Props> = ({
  isSidebarOpen,
  detectSlideStart,
  detectSlideEnd,
}) => {
  const pathname = usePathname()

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
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center justify-start rounded-lg gap-x-2 hover:bg-primary-100 px-2 py-2",
              pathname === route.href && "bg-primary-100"
            )}
          >
            {route.Icon(route.color)}
            <h2 className="text-white text-lg">{route.label}</h2>
          </Link>
        ))}
      </div>
      <p className="text-white text-center w-full">
        Made with Passion &#10084;
      </p>
    </div>
  )
}

export default Sidebar
