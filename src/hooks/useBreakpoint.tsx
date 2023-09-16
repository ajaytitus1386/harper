"use client"

import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "../../tailwind.config.js"
import { useMediaQuery } from "react-responsive"
import { ScreensConfig } from "tailwindcss/types/config.js"

const fullConfig = resolveConfig(tailwindConfig)

const breakpoints = fullConfig?.theme?.screens

// type BreakpointKey = ScreensConfig

export function useBreakpoint() {
  const breakpointKeys = ["sm", "md", "lg", "xl", "2xl"] as const
  type breakpointTypes = (typeof breakpointKeys)[number]
  const result: Record<breakpointTypes, boolean> = {
    sm: false,
    md: false,
    lg: false,
    xl: false,
    "2xl": false,
  }

  breakpointKeys.forEach((breakpointKey) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const bool = useMediaQuery({
      query: `(min-width: ${
        breakpoints ? breakpoints[breakpointKey as keyof ScreensConfig] : 320
      })`,
    })

    result[breakpointKey] = bool
  })

  return result
}

// const getBreakpointValue = (value: string): number =>
//   fullConfig?.theme?.screens
//     ? parseInt(
//         (
//           fullConfig.theme.screens[value as keyof ScreensConfig] as string
//         ).replace("px", ""),
//         10
//       )
//     : 0

// export const getCurrentBreakpoint = (): string => {
//   let currentBreakpoint: string = "base"
//   let biggestBreakpointValue = 0

//   if (!fullConfig?.theme?.screens) return "base"

//   for (const breakpoint of Object.keys(fullConfig.theme.screens)) {
//     const breakpointValue = getBreakpointValue(breakpoint)
//     if (
//       breakpointValue > biggestBreakpointValue &&
//       window.innerWidth >= breakpointValue
//     ) {
//       biggestBreakpointValue = breakpointValue
//       currentBreakpoint = breakpoint
//     }
//   }
//   return currentBreakpoint
// }
