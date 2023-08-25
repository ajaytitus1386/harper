"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons"

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-full relative">
      {/* Topbar */}
      <div className="flex flex-row justify-between items-center w-full h-16 bg-gray-900">
        <Button
          className="block md:hidden"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          <FontAwesomeIcon
            icon={isSidebarOpen ? faClose : faBars}
            className="text-lg text-white"
          />
        </Button>
      </div>
      <div className="flex flex-row h-full">
        {/* Sidebar */}
        <div
          className={[
            "flex flex-col w-72 md:translate-x-0 bg-gray-900 transition-all duration-300 ease-in-out",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        ></div>
        <main>{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
