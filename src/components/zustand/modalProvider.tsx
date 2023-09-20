"use client"

import { useEffect, useState } from "react"
import TransactionModal from "../dashboard/transaction/transactionModal"

export const ModalProvider = ({}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return <>{isMounted && <TransactionModal />}</>
}
