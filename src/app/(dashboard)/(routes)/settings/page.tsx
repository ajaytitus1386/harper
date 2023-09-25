"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useTransactionModal } from "@/hooks/useTransactionModal"
import useUserCredits from "@/hooks/useUserCredits"
import { useClerk, useUser } from "@clerk/nextjs"

import { UserTransaction } from "@prisma/client"
import axios from "axios"
import React, { useEffect, useState } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import CreditDisplay from "@/components/dashboard/creditDisplay"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

const SimpleTable = ({ transactions }: { transactions: UserTransaction[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>No.</TableHead>
        <TableHead>Credits</TableHead>
        <TableHead>Date</TableHead>
        <TableHead className="text-right">Amount Paid</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {transactions.map((txn, index) => (
        <TableRow key={txn.id}>
          <TableCell className="font-medium">{index + 1}</TableCell>
          <TableCell>{txn.credits}</TableCell>
          <TableCell>{new Date(txn.createdAt).toLocaleDateString()}</TableCell>
          <TableCell className="text-right">
            {txn.amountPaid.toFixed(2) + " " + txn.currency.toUpperCase()}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

const SettingsPage = () => {
  const { user } = useUser()
  const { signOut } = useClerk()
  const { userCredits, isFreeTier, isCreditsLoaded } = useUserCredits()

  const remainingCredits = userCredits?.totalCredits - userCredits?.usedCredits

  const { openModal } = useTransactionModal()
  const { toast } = useToast()
  const { replace } = useRouter()
  const [transactions, setTransactions] = useState<UserTransaction[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return

      const res = await axios.get(`api/transactions`)

      const txns: UserTransaction[] = res.data
      setTransactions(txns)
    }
    fetchData()
  }, [user?.id])

  const onDeleteAccount = async () => {
    try {
      const res = await axios.delete(`api/user`)
      if (res.status !== 200) throw new Error("Error deleting user")

      toast({
        title: "Account Deleted",
        description:
          "Your account has been deleted. We're sorry to see you go.",
      })

      signOut()
      replace("/")
    } catch (error: any) {
      toast({
        title: "Unable To Delete Account",
        description: "Please try again later.",
      })
    }
  }

  return (
    <div className="flex flex-col w-full h-full gap-y-2">
      <h1 className="text-xl md:text-2xl 2xl:text-4xl font-bold">
        Your Settings
      </h1>
      <Separator className="w-full bg-muted-foreground" />
      {/* Account Details */}
      <h2 className="text-lg md:text-xl 2xl:text-3xl font-medium">
        Account Details
      </h2>
      <div className="flex items-center justify-start">
        {isCreditsLoaded ? (
          isFreeTier ? (
            <>
              <p className="text-base font-normal">
                Your account is a free account.
                <Button
                  onClick={openModal}
                  className="m-0 p-0 ml-1 text-base font-normal underline"
                >
                  Upgrade Now
                </Button>
              </p>
            </>
          ) : (
            <>
              <p className="text-base font-normal">
                Your account is a{" "}
                <b className="text-transparent bg-gradient-to-r from-upgrade-from to-upgrade-to bg-clip-text">
                  Premium
                </b>{" "}
                account.
                <Button
                  onClick={openModal}
                  className="m-0 p-0 ml-1 text-base font-normal underline"
                >
                  Need more Credits?
                </Button>
              </p>
            </>
          )
        ) : (
          <Skeleton className="w-full sm:w-64 lg:w-96 h-4" />
        )}
      </div>
      <div className="w-full sm:w-1/2 md:w-[400px] lg:w-[640px]">
        <p className="block sm:hidden">Remaining Credits: {remainingCredits}</p>
        <CreditDisplay />
      </div>
      <AlertDialog>
        <AlertDialogTrigger className="w-fit">
          <Button className="w-fit" variant={"destructive"}>
            Delete Account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant={"destructive"} onClick={onDeleteAccount}>
              <AlertDialogAction>Continue</AlertDialogAction>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Separator className="w-full bg-muted-foreground" />
      {/* Transaction History */}
      <h2 className="text-lg md:text-xl 2xl:text-3xl font-medium">
        Transaction History
      </h2>
      {transactions.length ? (
        <SimpleTable transactions={transactions} />
      ) : (
        <p className="text-sm text-muted-foreground font-light">
          No Transactions have been made yet
        </p>
      )}
    </div>
  )
}

export default SettingsPage
