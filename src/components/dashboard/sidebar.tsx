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
import CreditDisplay from "./creditDisplay"
import { toolsContent } from "@/content/tools"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import { useTransactionModal } from "@/hooks/useTransactionModal"
import useUserCredits from "@/hooks/useUserCredits"

interface Props {
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  detectSlideStart: (e: React.TouchEvent<HTMLDivElement>) => void
  detectSlideEnd: (e: React.TouchEvent<HTMLDivElement>) => void
}

export interface HarperRoute {
  label: string
  Icon: (color: string, className: string) => React.JSX.Element
  href: string
  color: string
}

export const routes: HarperRoute[] = toolsContent.map((tool) => ({
  label: tool.label,
  color: tool.color,
  href: tool.href,
  Icon: tool.Icon,
}))

type SidebarLinkProps = HarperRoute & {
  setIsSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarLink = ({
  href,
  label,
  color,
  Icon,
  setIsSidebarOpen,
}: SidebarLinkProps) => {
  const pathname = usePathname()
  return (
    <Link
      key={href}
      href={href}
      className={cn(
        "flex items-center justify-start rounded-lg gap-x-2 hover:bg-primary-100 px-2 py-2",
        pathname === href && "bg-primary-100"
      )}
      onClick={() => setIsSidebarOpen && setIsSidebarOpen(false)}
    >
      {Icon(color, "text-xl w-8")}
      <h2 className="text-white text-lg">{label}</h2>
    </Link>
  )
}

const Sidebar: React.FC<Props> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  detectSlideStart,
  detectSlideEnd,
}) => {
  const { isFreeTier } = useUserCredits()
  const { openModal } = useTransactionModal()

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
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Separator className="px-2 bg-gray-600" />
        <h1 className="text-gray-400 ml-2 font-light text-sm">Tools</h1>
        {routes.map((route) => (
          <SidebarLink
            key={route.href}
            {...route}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        ))}
        <Separator className="px-2 bg-gray-600" />
        <SidebarLink
          label="Settings"
          href="/settings"
          color="text-routes-settings"
          Icon={(color: string) => (
            <FontAwesomeIcon icon={faGear} className={`${color} text-xl w-8`} />
          )}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      <div className="flex flex-col px-2 gap-y-2">
        <Card className="flex flex-col space-y-2 bg-primary-100 px-4 py-2 rounded-md border-0">
          <CardContent className="flex flex-row justify-between items-center p-0">
            <CreditDisplay />
          </CardContent>
          <CardFooter className="p-0">
            <Button
              onClick={openModal}
              className="w-full text-white font-bold px-2 py-1 bg-gradient-to-r from-upgrade-from to-upgrade-to bg-[length:200%_200%] bg-center hover:bg-right transition-all duration-300"
            >
              {isFreeTier ? "Upgrade" : "Add"}
            </Button>
          </CardFooter>
        </Card>
        {/* <p className="text-white text-center w-full">
          Made with Passion &#10084;
        </p> */}
      </div>
    </div>
  )
}

export default Sidebar
