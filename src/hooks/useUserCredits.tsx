import { INITIAL_FREE_CREDITS } from "@/lib/api-constants"
import { useUser } from "@clerk/nextjs"
import { UserApiLimit } from "@prisma/client"
import axios, { AxiosResponse } from "axios"
import { useEffect } from "react"
import { create } from "zustand"

interface useUserCreditsStore {
  userCredits: {
    usedCredits: number
    totalCredits: number
  }
  isFreeTier: boolean
  fetchUserCredits: (userId: string) => Promise<void>
}

const useUserCredits = create<useUserCreditsStore>((set) => ({
  userCredits: {
    usedCredits: 0,
    totalCredits: 0,
  },
  isFreeTier: true,
  fetchUserCredits: async (userId) => {
    if (!userId) return

    const res = await axios.get<any, AxiosResponse<UserApiLimit>>(
      "/api/user/" + userId
    )

    set({
      userCredits: {
        usedCredits: res.data.usedCredits,
        totalCredits: res.data.totalCredits,
      },
      isFreeTier: res.data.totalCredits <= INITIAL_FREE_CREDITS,
    })
  },
}))

export default useUserCredits

export const useFetchUserCredits = () => {
  const { user } = useUser()

  const fetch = useUserCredits.getState().fetchUserCredits

  useEffect(() => {
    if (!user?.id) return
    //
    fetch(user.id)
  }, [fetch, user?.id])
}
