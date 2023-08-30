"use client"

import React, { useState } from "react"
import Topbar from "@/components/dashboard/topbar"
import Sidebar from "@/components/dashboard/sidebar"

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-full relative">
      {/* Topbar */}
      <Topbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex flex-row h-full relative">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main className="py-1 px-2 md:py-2 md:px-4">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
