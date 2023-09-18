"use client"

import { Button } from "@/components/ui/button"
import { HarperTool, toolsContent } from "@/content/tools"
import { useBreakpoint } from "@/hooks/useBreakpoint"
import { cn } from "@/lib/utils"
import { SignUpButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import React, { Children, cloneElement, useEffect, useState } from "react"

const RotatingCarousel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isSignedIn, isLoaded } = useUser()
  const [isFocused, setIsFocused] = useState(false)
  const [selectedChild, setSelectedChild] = useState<React.ReactElement | null>(
    null
  )

  const description = (selectedChild as React.ReactElement)?.props?.[
    "description"
  ]
  const label = (selectedChild as React.ReactElement)?.props?.["label"]
  const bgColor = (selectedChild as React.ReactElement)?.props?.["bgcolor"]

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
        ? 55
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
    // if (isFocused) {
    //   exitFocus()
    // } else {
    //   enterFocus(child)
    // }
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
        const className = (child as React.ReactElement)?.props?.className

        const clonedChild = cloneElement(child as React.ReactElement, {
          className: cn(
            [
              className,
              "w-16 h-16 rounded-full flex justify-center items-center transition-transform duration-300 ease-in-out",
            ].join(" ")
          ),
        })

        return (
          <div
            // Since we use the top left attributes, we need to adjust the coordinates to start relative to the center of the circle
            style={{
              position: "absolute",
              zIndex: index % 2 === 0 ? "99" : "0",
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

      <div
        className="absolute z-10 w-full top-1/2 left-1/2 animate-counter-rotate origin-top-left"
        style={{ animationPlayState: isFocused ? "paused" : "running" }}
      >
        {/* top-[80%] lg:top-full */}
        <div className="relative -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-y-4 py-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-bold text-center">
            Get Started Now.
            <br />
            <u className="underline underline-offset-4">For Free.</u>
          </h2>
          <sub className="text-sm font-light text-white">
            No credit card required
          </sub>
          {isLoaded && isSignedIn ? (
            <Link href="/dashboard">
              <Button className="px-4 py-2 rounded-md bg-white text-landing-to">
                Dashboard
              </Button>
            </Link>
          ) : (
            <SignUpButton mode="modal">
              <Button className="px-4 py-2 rounded-md bg-white text-landing-to">
                Sign Up
              </Button>
            </SignUpButton>
          )}
        </div>
        {/* {selectedChild && (
          <div
            className={`relative -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-md`}
          >
            {description && (
              <>
                <p
                  className={`absolute top-0 left-0 text-[rgb(255,0,0)] font-bold`}
                >
                  {description}
                </p>
                <p
                  className={`absolute top-0 left-0 mix-blend-difference text-[rgb(0,255,255)] font-bold`}
                >
                  {description}
                </p>
              </>
            )}
          </div>
        )} */}
      </div>
    </div>
  )
}

const harperTools = toolsContent

const ToolSphere = ({
  label,
  color,
  bgColor,
  description,
  Icon,
}: HarperTool) => {
  return (
    <div
      data-label={label}
      data-description={description}
      data-bgcolor={bgColor}
      className={`${bgColor} shadow-lg w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full flex justify-center items-center transition-transform duration-300 ease-in-out`}
    >
      {Icon("text-white", "text-3xl sm:text-4xl md:text-5xl")}
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
        {harperTools.map((tool) => (
          <ToolSphere key={tool.href} {...tool} />
        ))}
      </RotatingCarousel>
    </div>
  )
}

export default LandingPage
