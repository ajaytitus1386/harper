"use client"

import React, { Children, cloneElement, useState } from "react"

const RotatingCarousel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [selectedChild, setSelectedChild] = useState<React.ReactElement | null>(
    null
  )
  const parentDiameter = 40 // in view widths

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
    console.log("entered")

    if (!child?.props) return
  }

  const exitFocus = () => {
    setIsFocused(false)
    setSelectedChild(null)
    console.log("exited")
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
          className: [
            (child as React.ReactElement)?.props?.className,
            "hover:scale-150 transition-transform duration-300 ease-in-out",
          ].join(" "),
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
      <h1 className="absolute top-16 text-2xl md:text-3xl xl:text-4xl xxl:text-5xl xl:leading-normal font-bold text-transparent text-center bg-clip-text bg-gradient-to-r from-landing-from to-landing-to">
        Compose your Imagination into Reality
      </h1>
      <RotatingCarousel>
        <div className="w-16 h-16 bg-indigo-700 rounded-full flex justify-center items-center">
          hello
        </div>

        <div className="w-16 h-16 bg-indigo-200 rounded-full flex justify-center items-center">
          harper
        </div>
      </RotatingCarousel>
    </div>
  )
}

export default LandingPage
