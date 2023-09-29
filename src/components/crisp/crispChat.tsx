"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"
import { usePathname } from "next/navigation"

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("e7b6e313-7307-4d09-90bc-8ec6cdba6719")
  }, [])

  const path = usePathname()

  useEffect(() => {
    const cripsWhitelistedPaths = ["/dashboard", "/settings"]
    if (cripsWhitelistedPaths.includes(path)) {
      Crisp.chat.show()
    } else {
      Crisp.chat.hide()
    }
  }, [path])

  return null
}

export default CrispChat
