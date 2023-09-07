"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import PropogateLoader from "react-spinners/PropagateLoader"

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useUser()

  const [isSplash, setIsSplash] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSplash(false)
    }, 2000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const animatedDividerClassName = `transition-transform duration-700 delay-500 ${
    isSplash ? "-translate-y-full" : "-translate-y-0"
  }`

  const animatedLandingElementsClassName = `transition-opacity duration-500 delay-1000 ${
    isSplash ? "opacity-0" : "opacity-100"
  }`

  const animatedBokehElipsesClassName = `transition-all duration-500 delay-1000 ${
    isSplash ? "opacity-0 -translate-y-full" : "opacity-100 -translate-y-0"
  }`

  const bokehElipsesClassName = `absolute w-[400px] sm:w-[500px] md:w-[800px] w-[400px] sm:w-[500px] md:h-[800px]`

  return (
    <main
      className={cn(
        "relative h-full max-w-full bg-gradient-to-b from-landing-from to-landing-to",
        isSplash ? "overflow-hidden" : "overflow-y-auto overflow-x-hidden"
      )}
    >
      <PropogateLoader
        color={"#fff"}
        loading={isSplash}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
        className="absolute top-1/2 left-1/2 -translate-y-1/2"
      />

      <div
        className={cn(
          [
            "absolute top-0 left-0 w-full overflow-hidden",
            animatedDividerClassName,
          ].join(" ")
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1280 901.84"
          preserveAspectRatio="none"
          className="relative block w-[100%] md:-translate-y-1/2"
        >
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <path
                d="M1280,720c-91.52,26.28-183.13,64.84-274.76,105.13a906.78,906.78,0,0,1-729.77.11C183.69,784.91,91.89,746.31,0,720V0H1280Z"
                className="fill-white"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* Bokeh Elipses */}
      <div
        className={cn(
          [
            bokehElipsesClassName,
            "top-1/2 md:top-[30%] left-0 -translate-x-1/2 -translate-y-1/2",
            animatedBokehElipsesClassName,
          ].join(" ")
        )}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {" "}
          <path
            className="isolate opacity-10 mix-blend-overlay"
            fill="white"
            d="M20.7,-20.8C26.7,-14.6,31.4,-7.3,31.8,0.3C32.1,8,28.1,16,22.1,21.5C16,27,8,30,-1.9,31.9C-11.8,33.7,-23.5,34.5,-28.7,29C-34,23.5,-32.7,11.8,-31.3,1.4C-29.9,-9,-28.4,-17.9,-23.1,-24.1C-17.9,-30.2,-9,-33.6,-0.8,-32.8C7.3,-31.9,14.6,-26.9,20.7,-20.8Z"
            transform="translate(50 50)"
            stroke-width="0"
          ></path>{" "}
        </svg>
      </div>
      <div
        className={cn(
          [
            bokehElipsesClassName,
            "top-1/3 right-0 translate-x-1/2 -translate-y-1/2 -scale-100",
            animatedBokehElipsesClassName,
          ].join(" ")
        )}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path
            className="isolate opacity-10 mix-blend-overlay"
            fill="white"
            d="M24.7,-32C32.4,-28.3,39.3,-21.7,41.8,-13.6C44.4,-5.6,42.5,3.8,37.7,10.2C32.8,16.7,25,20.2,18.2,25.7C11.5,31.2,5.7,38.7,0,38.7C-5.8,38.7,-11.5,31.2,-19,26C-26.6,20.7,-35.9,17.7,-40.5,11.3C-45.2,4.9,-45.2,-4.9,-41.4,-12.5C-37.6,-20,-30,-25.4,-22.4,-29.1C-14.9,-32.9,-7.4,-35.1,0.5,-35.8C8.5,-36.5,16.9,-35.8,24.7,-32Z"
            transform="translate(50 50)"
            stroke-width="0"
          ></path>{" "}
        </svg>
      </div>

      <div
        className={cn(
          [
            bokehElipsesClassName,
            "top-1/3 sm:top-[10%] left-0 -translate-x-1/2 -translate-y-1/2 -scale-100",
            animatedBokehElipsesClassName,
          ].join(" ")
        )}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path
            className="isolate opacity-10 mix-blend-overlay"
            fill="white"
            d="M23.5,-30.9C28.5,-23.9,29,-14.6,31.3,-5C33.6,4.6,37.7,14.4,35.3,22.2C33,30.1,24.1,35.9,14.6,39C5,42,-5.2,42.2,-13.1,38.3C-20.9,34.4,-26.5,26.4,-32,17.9C-37.5,9.5,-43.1,0.4,-41.2,-6.8C-39.4,-14.1,-30.2,-19.6,-22.1,-26C-14,-32.3,-7,-39.6,1.1,-41C9.3,-42.3,18.6,-37.8,23.5,-30.9Z"
            transform="translate(50 50)"
            stroke-width="0"
          ></path>{" "}
        </svg>
      </div>

      {/* Children */}
      <div
        className={cn(
          [
            "absolute top-0 left-0 h-full w-full",
            animatedLandingElementsClassName,
          ].join(" ")
        )}
      >
        {children}
      </div>

      {/* Top bar */}
      <div
        className={cn(
          [
            "absolute w-full flex justify-between items-center py-2 px-4 bg-transparent",
            animatedLandingElementsClassName,
          ].join(" ")
        )}
      >
        <Image
          src="/harp.svg"
          width={64}
          height={64}
          alt="Harper"
          className="h-8 w-8"
        />
        {isLoaded && isSignedIn ? (
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        ) : (
          <div className="flex gap-x-4">
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Sign Up</Button>
            </SignUpButton>
          </div>
        )}
      </div>
    </main>
  )
}

export default LandingLayout
