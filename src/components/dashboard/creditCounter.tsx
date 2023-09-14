"use client"

import React from "react"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Progress } from "../ui/progress"
import { Button } from "../ui/button"
import useUserCredits from "@/hooks/useUserCredits"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoins } from "@fortawesome/free-solid-svg-icons"
import { useTransactionModal } from "@/hooks/useTransactionModal"

const CreditCounter = () => {
  const { userCredits, isFreeTier } = useUserCredits()

  const { openModal } = useTransactionModal()

  const progress = userCredits
    ? (userCredits?.usedCredits / userCredits?.totalCredits) * 100
    : 0

  return (
    <Card className="flex flex-col space-y-2 bg-primary-100 px-4 py-2 rounded-md border-0">
      <CardContent className="flex flex-row justify-between items-center p-0">
        <h2 className="text-white tracking-wide font-light">
          {isFreeTier ? "Free" : "Your"} Credits:
        </h2>
        <div className="flex items-center justify-center text-white font-light">
          <p>{userCredits?.usedCredits}</p>/<p>{userCredits?.totalCredits}</p>
          <FontAwesomeIcon icon={faCoins} className="text-lg text-white ml-1" />
        </div>
      </CardContent>

      <Progress className="h-2" value={progress} />
      <CardFooter className="p-0">
        <Button
          onClick={openModal}
          className="w-full text-white font-bold px-2 py-1 bg-gradient-to-r from-upgrade-from to-upgrade-to bg-[length:200%_200%] bg-center hover:bg-right transition-all duration-300"
        >
          {isFreeTier ? "Upgrade" : "Add"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CreditCounter
