"use client"

import React, { useState } from "react"
import Topbar from "@/components/dashboard/topbar"
import Sidebar from "@/components/dashboard/sidebar"

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  let touchStart = 0
  let touchEnd = 0

  const detectSlideStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStart = e.changedTouches[0].clientX
  }

  const detectSlideEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEnd = e.changedTouches[0].clientX
    if (touchStart - touchEnd > 45) {
      setIsSidebarOpen(false)
    }
    if (touchStart - touchEnd < -45) {
      setIsSidebarOpen(true)
    }
  }

  return (
    <div className="flex flex-col h-full relative">
      {/* Topbar */}
      <Topbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex flex-row h-full overflow-hidden relative">
        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          detectSlideStart={detectSlideStart}
          detectSlideEnd={detectSlideEnd}
        />
        <main
          onTouchStart={detectSlideStart}
          onTouchEnd={detectSlideEnd}
          className="flex h-full w-full py-4 px-4 md:py-8 md:px-12 lg:px-32 overflow-y-auto"
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
