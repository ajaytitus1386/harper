"use client"

import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useUser()
  return (
    <main className="relative h-full max-w-full overflow-auto bg-gradient-to-b from-landing-from to-landing-to">
      <div className="absolute top-0 left-0 w-full overflow-hidden">
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
      <div className="absolute top-0 left-0 h-full w-full">{children}</div>

      {/* Top bar */}
      <div className="absolute w-full flex justify-between items-center py-2 px-4 bg-transparent">
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
            <Link href="/sign-in">
              <Button>Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}

export default LandingLayout
