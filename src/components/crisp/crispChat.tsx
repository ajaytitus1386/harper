"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("e7b6e313-7307-4d09-90bc-8ec6cdba6719")
  }, [])

  return null
}

export default CrispChat
