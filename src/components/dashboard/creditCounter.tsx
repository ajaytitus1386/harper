"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Progress } from "../ui/progress"
import axios, { AxiosResponse } from "axios"
import { useUser } from "@clerk/nextjs"
import { UserApiLimit } from "@prisma/client"
import { Button } from "../ui/button"

const CreditCounter = () => {
  const { user } = useUser()

  const [userCredits, setUserCredits] = useState<{
    usedCredits: number
    totalCredits: number
  }>({ usedCredits: 0, totalCredits: 0 })

  const progress = userCredits
    ? (userCredits?.usedCredits / userCredits?.totalCredits) * 100
    : 0

  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.id) return

      const res = await axios.get<any, AxiosResponse<UserApiLimit>>(
        "/api/user/" + user.id
      )

      setUserCredits({
        usedCredits: res.data.usedCredits,
        totalCredits: res.data.totalCredits,
      })
    }
    fetchUser()
  }, [user?.id])

  return (
    <Card className="flex flex-col space-y-2 bg-primary-100 px-4 py-2 rounded-md border-0">
      <CardContent className="flex flex-row justify-between items-center p-0">
        <h2 className="text-white tracking-wide font-light">Your Credits:</h2>
        <div className="flex text-white font-light">
          <h3>{userCredits?.usedCredits}</h3>/
          <h3>{userCredits?.totalCredits}</h3>
        </div>
      </CardContent>

      <Progress className="h-2" value={progress} />
      <CardFooter className="p-0">
        <Button className="w-full text-white font-bold px-2 py-1 bg-gradient-to-r from-upgrade-from to-upgrade-to bg-[length:200%_200%] bg-center hover:bg-right transition-all duration-300">
          Upgrade
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CreditCounter
