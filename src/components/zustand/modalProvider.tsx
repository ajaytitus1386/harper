"use client"

import { useEffect, useState } from "react"
import TransactionModal from "../dashboard/transactionModal"

export const ModalProvider = ({}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return <>{isMounted && <TransactionModal />}</>
}
