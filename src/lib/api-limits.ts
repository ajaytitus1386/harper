import prismadb from "./prismadb"
import { INITIAL_FREE_CREDITS } from "./api-constants"

type ApiLimitRequest = {
  userId: string
}

type ApiCreditsRequest = {
  userId: string
}

type ApiSetCreditsRequest = ApiCreditsRequest & {
  credits: number
}

export const addToApiTotalCredits = async ({
  userId,
  credits,
}: ApiSetCreditsRequest) => {
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  })

  if (!userApiLimit) {
    await initNewApiUser({ userId })
    await prismadb.userApiLimit.update({
      where: { userId },
      data: {
        totalCredits: INITIAL_FREE_CREDITS + credits,
      },
    })
  } else {
    await prismadb.userApiLimit.update({
      where: { userId },
      data: {
        totalCredits: userApiLimit.totalCredits + credits,
      },
    })
  }
}

export const addToApiUsedCredits = async ({
  userId,
  credits,
}: ApiSetCreditsRequest) => {
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  })

  if (!userApiLimit) {
    const newUser = await initNewApiUser({ userId })

    await prismadb.userApiLimit.update({
      where: { userId },
      data: {
        usedCredits: Math.min(credits, newUser.totalCredits),
      },
    })
  } else {
    await prismadb.userApiLimit.update({
      where: { userId },
      data: {
        usedCredits: Math.min(
          userApiLimit.usedCredits + credits,
          userApiLimit.totalCredits
        ),
      },
    })
  }
}

export const getApiCredits = async ({ userId }: ApiCreditsRequest) => {
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  })

  if (!userApiLimit) {
    await initNewApiUser({ userId })

    return { usedCredits: 0, totalCredits: INITIAL_FREE_CREDITS }
  }

  return {
    usedCredits: userApiLimit.usedCredits,
    totalCredits: userApiLimit.totalCredits,
  }
}

export const initNewApiUser = async ({ userId }: ApiLimitRequest) => {
  const res = await prismadb.userApiLimit.create({
    data: {
      userId,
      totalCredits: INITIAL_FREE_CREDITS,
      usedCredits: 0,
    },
  })

  return res
}

export const makePermanentApiUser = async ({ userId }: ApiLimitRequest) => {
  const res = await prismadb.userApiLimit.update({
    where: { userId },
    data: {
      isNewUser: false,
    },
  })

  return res
}
