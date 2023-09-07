"use client"

import { useBreakpoint } from "@/hooks/useBreakpoint"
import { cn } from "@/lib/utils"
import React, { Children, cloneElement, useEffect, useState } from "react"

const RotatingCarousel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [selectedChild, setSelectedChild] = useState<React.ReactElement | null>(
    null
  )

  // const breakpoint = getCurrentBreakpoint()

  const breakpoints = useBreakpoint()
  // Measured in view widths (vw)
  const [parentDiameter, setParentDiameter] = useState(15)

  useEffect(() => {
    setParentDiameter(
      breakpoints["2xl"]
        ? 30
        : breakpoints["xl"]
        ? 30
        : breakpoints["lg"]
        ? 35
        : breakpoints["md"]
        ? 40
        : breakpoints["sm"]
        ? 60
        : 80
    )
  }, [breakpoints])

  const arrayOfChildren = Children.toArray(children)

  // Calculates the points in X-Y Cartesian system to place the children
  // Note: These points need to be adjusted to center of circle rather than the top left corner
  const points = arrayOfChildren.map((_, index) => {
    let theta = (Math.PI * 2) / arrayOfChildren.length
    let angle = theta * index

    return [
      (parentDiameter / 2) * Math.cos(angle),
      (parentDiameter / 2) * Math.sin(angle),
    ]
  })

  const enterFocus = (child: React.ReactElement) => {
    setIsFocused(true)
    setSelectedChild(child)

    if (!child?.props) return
  }

  const exitFocus = () => {
    setIsFocused(false)
    setSelectedChild(null)
  }

  const toggleFocus = (child: React.ReactElement) => {
    if (isFocused) {
      exitFocus()
    } else {
      enterFocus(child)
    }
  }

  return (
    <div
      style={{
        width: `${parentDiameter}vw`,
        height: `${parentDiameter}vw`,
        animationPlayState: isFocused ? "paused" : "running",
      }}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        exitFocus()
      }}
      className={`relative rounded-full animate-rotate`}
    >
      {Children.map(children, (child, index) => {
        const clonedChild = cloneElement(child as React.ReactElement, {
          className: cn(
            [
              (child as React.ReactElement)?.props?.className,
              "w-16 h-16 rounded-full flex justify-center items-center transition-transform duration-300 ease-in-out",
            ].join(" ")
          ),
        })

        return (
          <div
            // Since we use the top left attributes, we need to adjust the coordinates to start relative to the center of the circle
            style={{
              position: "absolute",
              // 50% of parent size is used
              top:
                selectedChild === child
                  ? "50%"
                  : `calc(${points[index][0]}vw + 50%)`,
              left:
                selectedChild === child
                  ? "50%"
                  : `calc(${points[index][1]}vw + 50%)`,
              // And is then offset to correctly be placed in the center
              transform: `translate(-50%, -50%)`,
              transition: "all 0.3s ease-in-out",
            }}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
              e.stopPropagation()
              toggleFocus(child as React.ReactElement)
            }}
          >
            <div
              className="animate-counter-rotate"
              style={{ animationPlayState: isFocused ? "paused" : "running" }}
            >
              {clonedChild}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const LandingPage = () => {
  return (
    <div className="flex flex-col relative items-center justify-center h-full w-full mt-8">
      <h1 className="absolute w-full md:w-1/2 top-16 text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl leading-normal font-bold text-transparent text-center bg-clip-text bg-gradient-to-r from-landing-from to-landing-to">
        Compose your Imagination into Reality
      </h1>
      <RotatingCarousel>
        <div className="bg-indigo-500">hello</div>

        <div className="bg-indigo-200">harper</div>

        <div className="bg-indigo-700">hanya</div>

        <div className="bg-indigo-700">honalulu</div>

        <div className="bg-indigo-700">haberdash</div>
      </RotatingCarousel>
    </div>
  )
}

export default LandingPage
