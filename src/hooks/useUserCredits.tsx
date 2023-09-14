import { INITIAL_FREE_CREDITS } from "@/lib/api-constants"
import { useUser } from "@clerk/nextjs"
import { UserApiLimit } from "@prisma/client"
import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"

const useUserCredits = () => {
  const { user } = useUser()

  const [userCredits, setUserCredits] = useState<{
    usedCredits: number
    totalCredits: number
  }>({ usedCredits: 0, totalCredits: 0 })
  const [isFreeTier, setIsFreeTier] = useState(true)

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

      setIsFreeTier(res.data.totalCredits <= INITIAL_FREE_CREDITS)
    }
    fetchUser()
  }, [user?.id])
  return {
    userCredits,
    isFreeTier,
  }
}

export default useUserCredits
