"use client"

import { HarperRoute } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { faArrowRight, faComments } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import React, { useState } from "react"

type HarperTool = HarperRoute & {
  bgColor: string
  Blurb: React.JSX.Element
}

const tools: HarperTool[] = [
  {
    label: "Conversation",
    href: "/conversation",
    color: "text-routes-conversation",
    Icon: (color: string) => (
      <FontAwesomeIcon icon={faComments} className={`${color} text-xl w-8`} />
    ),
    bgColor: "bg-routes-conversation/75",
    Blurb: (
      <p>
        Chat about anything to Llama language model, trained on 70 billion
        parameters
      </p>
    ),
  },
]

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
        {tool.Icon("text-white")}
        <h1 className={`text-lg text-white font-bold`}>{tool.label}</h1>
      </div>
      {/* Spacer */}
      <div className={`w-full flex justify-center items-center h-1/5 `} />
      <div
        className={`flex flex-col w-full h-full pt-2 text-gray-400 text-sm text-center items-center transition-transform ${
          isFocused && "-translate-y-full"
        }`}
      >
        {tool.Blurb}
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
    <div className="flex flex-col items-center justify-start w-full mt-6">
      <h1 className="text-xl md:text-3xl font-bold">
        What will you compose today?
      </h1>
      <p className="text-muted-foreground font-light text-sm md:text-base text-center">
        Explore your suite of applications
      </p>
      <div className="w-full mt-6 grid grid-cols-[repeat(auto-fit,_minmax(192px,1fr))] gap-2 justify-items-center items-center">
        {tools.map((tool) => (
          <ToolCard key={tool.href} tool={tool} />
        ))}
      </div>
    </div>
  )
}

export default DashboardPage
