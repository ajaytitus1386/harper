"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { useTransactionModal } from "@/hooks/useTransactionModal"
import { Card, CardDescription, CardHeader } from "../ui/card"
import { Button } from "../ui/button"

type TransactionProps = {
  credits: number
  price: number
  unit: string
  isRecommended: boolean
}

export const transactionOptions: TransactionProps[] = [
  {
    credits: 10,
    price: 100,
    unit: "INR",
    isRecommended: false,
  },
]

const TransactionOption = ({
  credits,
  price,
  unit,
  isRecommended,
}: TransactionProps) => {
  return (
    <div className="border-2 border-muted-foreground rounded-md">
      <CardHeader className="flex flex-row space-y-0 w-full items-center justify-between px-4 py-1">
        <h1 className="text-black text-lg font-bold">{credits} Credits</h1>
        <div className="text-black text-lg font-light">
          {price} {unit}
        </div>
      </CardHeader>
      <CardDescription></CardDescription>
    </div>
  )
}

const TransactionModal = () => {
  const { isOpen, closeModal } = useTransactionModal()

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Purchase More Credits</DialogTitle>
          <DialogDescription>
            Top-up on credits to keep using Harper!
          </DialogDescription>
        </DialogHeader>
        {transactionOptions.map((option) => (
          <TransactionOption key={option.credits} {...option} />
        ))}
        <DialogFooter>
          <Button>Purchase</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TransactionModal
