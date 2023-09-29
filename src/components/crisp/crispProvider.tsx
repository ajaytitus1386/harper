"use client"

import React from "react"
import CrispChat from "./crispChat"
import { usePathname } from "next/navigation"

const CrispProvider = () => {
  const path = usePathname()

  const cripsWhitelistedPaths = ["/dashboard", "/settings"]

  return <>{cripsWhitelistedPaths.includes(path) && <CrispChat />}</>
}

export default CrispProvider
