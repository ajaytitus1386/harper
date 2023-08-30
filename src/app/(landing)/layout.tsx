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
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[300%] h-[750px]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
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
      <div className="h-full w-full">{children}</div>
    </main>
  )
}

export default LandingLayout
