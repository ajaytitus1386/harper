"use client"

import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog"
import { Card, CardDescription, CardHeader } from "../../ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "../../ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { useTransactionModal } from "@/hooks/useTransactionModal"
import ComingSoon from "../comingSoon"
import { useForm } from "react-hook-form"
import { transactionFormSchema } from "./constant"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { TransactionFormBody } from "@/app/(api)/api/stripe/route"
import { submitTransactionForm } from "@/services/transaction"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { useUser } from "@clerk/nextjs"
import { cn } from "@/lib/utils"

type TransactionOptionContent = {
  name: string
  priceId: string
  credits: number
  price: number
  unit: string
  isRecommended: boolean
}

type TransactionProps = TransactionOptionContent & {
  isSelected: boolean
}

export const transactionOptions: TransactionOptionContent[] = [
  {
    name: "Basic: 250 words of Conversation responses",
    priceId: "price_1Nt52gSCc7vncoJQ2crtH9Vx",
    credits: 10,
    price: 10,
    unit: "INR",
    isRecommended: false,
  },
  {
    name: "Regular: 1250 words of Conversation responses",
    priceId: "price_1NrxVwSCc7vncoJQ9USQdKHv",
    credits: 50,
    price: 50,
    unit: "INR",
    isRecommended: true,
  },
  {
    name: "Premium: 2500 words of Conversation responses",
    priceId: "price_1Nt53ASCc7vncoJQr8O6yhOD",
    credits: 100,
    price: 100,
    unit: "INR",
    isRecommended: false,
  },
]

const TransactionOption = ({
  name,
  priceId,
  credits,
  price,
  unit,
  isRecommended,
  isSelected,
}: TransactionProps) => {
  return (
    <FormItem className="w-full">
      <FormControl>
        <RadioGroupItem
          value={priceId}
          className={cn(
            "w-full border-2 border-transparent relative bg-clip-padding",
            isSelected &&
              "after:content-[''] after:absolute after:top-[-2px] after:left-[-2px] after:right-[-2px] after:bottom-[-2px] after:z-[-1] after:rounded-md after:bg-gradient-to-r after:from-upgrade-from after:to-upgrade-to"
          )}
        >
          <Card className="flex flex-col items-start rounded-md justify-center bg-white shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 w-full px-4 py-1">
              <div className="flex items-center justify-center space-x-2">
                <h1 className="text-black text-lg font-bold">
                  {credits} Credits
                </h1>
                {isRecommended && (
                  <Badge className="bg-gradient-to-r from-upgrade-from to-upgrade-to text-white font-bold">
                    <FontAwesomeIcon icon={faStar} />
                  </Badge>
                )}
              </div>
              <div className="text-black text-lg font-light">
                {price} {unit}
              </div>
            </CardHeader>
            <CardDescription className="px-4 pb-2">{name}</CardDescription>
          </Card>
        </RadioGroupItem>
      </FormControl>
    </FormItem>
  )
}

const TransactionModal = () => {
  const { isOpen, closeModal } = useTransactionModal()
  const { push } = useRouter()
  const { user } = useUser()

  const defaultValues = {
    priceId: "price_1NrxVwSCc7vncoJQ9USQdKHv",
    quantity: 1,
  }

  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: defaultValues,
  })

  const creditOptionSelected: number | undefined = transactionOptions.find(
    (txn) => txn.priceId === form.getValues("priceId")
  )?.credits

  const totalCredits = creditOptionSelected
    ? creditOptionSelected * form.getValues("quantity")
    : null

  const onSubmit = async (values: z.infer<typeof transactionFormSchema>) => {
    if (!user?.id) {
      toast({
        title: "User Authentication Error",
        description: "Please try again",
      })
      return
    }

    if (!creditOptionSelected) {
      toast({
        title: "Invalid Option",
        description: "Please select a valid credit option.",
      })
      return
    }

    const body: TransactionFormBody = {
      priceId: values.priceId,
      quantity: values.quantity,
      userId: user?.id,
      credits: creditOptionSelected,
    }

    try {
      const response = await submitTransactionForm(body)
      if (!response?.data?.url) {
        console.log("No url found")
        throw Error("URL not found")
      }

      push(response?.data?.url)
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description:
          "Sorry, couldn't complete your transaction. Try again later.",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="bg-gray-50">
        {/* <ComingSoon /> */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Purchase More Credits</DialogTitle>
              <DialogDescription>
                Top-up on credits to keep using Harper!
              </DialogDescription>
            </DialogHeader>
            {/*  */}
            <FormField
              control={form.control}
              name="priceId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={defaultValues.priceId}
                        className="gap-y-4 py-2"
                      >
                        {transactionOptions.map((option) => (
                          <TransactionOption
                            key={option.credits}
                            {...option}
                            isSelected={
                              form.getValues().priceId === option.priceId
                            }
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )
              }}
            />

            <Separator className="my-2 bg-muted-foreground" />

            {/* <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            /> */}

            {/*  */}
            <DialogFooter>
              <Button
                type="submit"
                className="bg-gradient-to-r from-upgrade-from to-upgrade-to text-white font-bold"
              >
                Purchase
                {totalCredits && ` ${totalCredits} Credits`}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default TransactionModal
