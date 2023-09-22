"use client"

import React from "react"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Progress } from "../ui/progress"
import { Button } from "../ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoins } from "@fortawesome/free-solid-svg-icons"
import { useTransactionModal } from "@/hooks/useTransactionModal"
import useUserCredits, { useFetchUserCredits } from "@/hooks/useUserCredits"

const CreditDisplay = () => {
  const { userCredits, isFreeTier } = useUserCredits()

  useFetchUserCredits()

  const { openModal } = useTransactionModal()

  const progress = userCredits
    ? (userCredits?.usedCredits / userCredits?.totalCredits) * 100
    : 0

  return (
    <Card className="flex flex-col space-y-2 bg-primary-100 px-4 py-2 rounded-md border-0">
      <CardContent className="flex flex-row justify-between items-center p-0">
        <div className="relative h-4 w-full overflow-hidden rounded-2xl bg-white">
          <div
            id="progress-bar"
            style={{ backgroundSize: `${progress}% 100%` }}
            className="relative w-full h-full bg-gradient-to-r from-upgrade-from to-upgrade-to bg-no-repeat"
          >
            <div
              id="underlying-text"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold tracking-wide text-upgrade-to invert mix-blend-difference"
            >
              {userCredits?.usedCredits}/{userCredits?.totalCredits}
              <FontAwesomeIcon icon={faCoins} className="text-sm ml-1" />
            </div>
          </div>
          <div
            id="overlying-bar"
            style={{
              clipPath: `polygon(0 0, ${progress}% 0, ${progress}% 100%, 0% 100%)`,
            }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <div
              id="overlying-text"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold tracking-wide text-white"
            >
              {userCredits?.usedCredits}/{userCredits?.totalCredits}
              <FontAwesomeIcon icon={faCoins} className="text-sm ml-1" />
            </div>
          </div>
        </div>
      </CardContent>

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

export default CreditDisplay
