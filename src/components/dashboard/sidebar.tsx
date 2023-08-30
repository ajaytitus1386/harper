import React from "react"
import { faGear, faLayerGroup } from "@fortawesome/free-solid-svg-icons"
import { faComments } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

interface Props {
  isSidebarOpen: boolean
}

interface Route {
  label: string
  Icon: (color: string) => React.JSX.Element
  href: string
  color: string
}

const routes: Route[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    color: "text-routes-dashboard",
    Icon: (color: string) => (
      <FontAwesomeIcon icon={faLayerGroup} className={`${color} text-xl w-8`} />
    ),
  },
  {
    label: "Converstaion",
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

const Sidebar: React.FC<Props> = ({ isSidebarOpen }) => {
  return (
    <div
      className={[
        "absolute top-0 md:relative h-full flex flex-col justify-between py-4 px-2 w-72 bg-primary-300 transition-all duration-300 ease-in-out overflow-hidden",
        isSidebarOpen ? "left-0 md:left-auto" : "-left-full md:left-auto",
      ].join(" ")}
    >
      <div className="flex flex-col gap-y-4 px-4 py-8 overflow-auto">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="flex items-center justify-start gap-x-2"
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
