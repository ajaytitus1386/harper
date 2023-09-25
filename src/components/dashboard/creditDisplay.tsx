"use client"

import React from "react"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoins } from "@fortawesome/free-solid-svg-icons"
import { useTransactionModal } from "@/hooks/useTransactionModal"
import useUserCredits, { useFetchUserCredits } from "@/hooks/useUserCredits"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { Skeleton } from "../ui/skeleton"

const CreditDisplay = () => {
  const { userCredits, isCreditsLoaded } = useUserCredits()

  useFetchUserCredits()

  const progress = userCredits
    ? (userCredits?.usedCredits / userCredits?.totalCredits) * 100
    : 0

  return isCreditsLoaded ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full">
          <div className="relative h-4 w-full overflow-hidden rounded-2xl bg-white">
            <div
              id="progress-bar"
              style={{ backgroundSize: `${progress}% 100%` }}
              className="relative w-full h-full bg-gradient-to-r from-upgrade-from to-upgrade-to bg-no-repeat"
            >
              <div
                id="underlying-text"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold tracking-wide text-upgrade-from invert mix-blend-difference"
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
        </TooltipTrigger>
        <TooltipContent sideOffset={16}>
          <p className="text-sm">{`Remaining Credits: ${
            userCredits?.totalCredits - userCredits?.usedCredits
          }`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <Skeleton className="h-4 w-full rounded-2xl" />
  )
}

export default CreditDisplay
