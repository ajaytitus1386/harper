"use client"

import { HarperRoute } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { HarperTool, toolsContent } from "@/content/tools"
import { faArrowRight, faComments } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import React, { useState } from "react"

const tools: HarperTool[] = toolsContent

const ToolCard = ({ tool }: { tool: HarperTool }) => {
  const [isFocused, setIsFocused] = useState(false)
  return (
    <Card
      onClick={() => setIsFocused((prev) => !prev)}
      className="w-48 h-32 overflow-hidden cursor-pointer"
    >
      <div
        className={`flex flex-col gap-y justify-center items-center w-full h-4/5 transition-transform ${
          tool.bgColor
        } ${isFocused && "-translate-y-full"}`}
      >
        {tool.Icon("text-white", "")}
        <h1 className={`text-lg text-white font-bold`}>{tool.label}</h1>
      </div>
      {/* Spacer */}
      <div className={`w-full flex justify-center items-center h-1/5 `} />
      <div
        className={`flex flex-col w-full h-full pt-2 text-gray-400 text-sm text-center items-center transition-transform ${
          isFocused && "-translate-y-full"
        }`}
      >
        <p className="h-4/5 px-1">{tool.description}</p>
        <Link
          onClick={(e) => e.stopPropagation()}
          href={tool.href}
          className="w-full"
        >
          <FontAwesomeIcon
            icon={faArrowRight}
            className={`text-lg ${tool.color}`}
          />
        </Link>
      </div>
    </Card>
  )
}

const DashboardPage = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full my-6">
      <h1 className="text-xl md:text-3xl font-bold text-center">
        What will you compose today?
      </h1>
      <p className="text-muted-foreground font-light text-sm md:text-base text-center">
        Explore your suite of applications
      </p>
      <div className="w-full my-6 grid grid-cols-[repeat(auto-fit,_minmax(192px,1fr))] gap-4 md:gap-8 justify-items-center items-center">
        {tools.map((tool) => (
          <ToolCard key={tool.href} tool={tool} />
        ))}
      </div>
    </div>
  )
}

export default DashboardPage
