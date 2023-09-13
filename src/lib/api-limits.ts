import prismadb from "./prismadb"
import { MAX_FREE_COUNTS } from "./api-constants"

type ApiLimitRequest = {
  userId: string
}

type ApiCreditsRequest = {
  userId: string
}

type ApiSetCreditsRequest = ApiCreditsRequest & {
  credits: number
}

/**
 * Increases the API limit count by 1 for the user.
 */
export const increaseApiLimit = async ({ userId }: ApiLimitRequest) => {
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  })

  if (!userApiLimit) {
    await prismadb.userApiLimit.create({
      data: {
        userId,
        count: 1,
      },
    })
  } else {
    await prismadb.userApiLimit.update({
      where: { userId },
      data: {
        count: userApiLimit.count + 1,
      },
    })
  }
}

/**
 * Returns true if the user has not exceeded the free API limit.
 */
export const checkApiLimit = async ({ userId }: ApiLimitRequest) => {
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  })

  if (!userApiLimit) return true

  return userApiLimit.count < MAX_FREE_COUNTS
}

export const getApiLimit = async ({ userId }: ApiLimitRequest) => {
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  })

  if (!userApiLimit) return 0

  return userApiLimit.count
}

export const addApiCredits = async ({
  userId,
  credits,
}: ApiSetCreditsRequest) => {
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  })

  if (!userApiLimit) {
    await prismadb.userApiLimit.create({
      data: {
        userId,
        credits,
      },
    })
  } else {
    await prismadb.userApiLimit.update({
      where: { userId },
      data: {
        credits: userApiLimit.credits + credits,
      },
    })
  }
}

export const subtractApiCredits = async ({
  userId,
  credits,
}: ApiSetCreditsRequest) => {
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  })

  if (!userApiLimit) {
    await prismadb.userApiLimit.create({
      data: {
        userId,
        credits: 0,
      },
    })
  } else {
    await prismadb.userApiLimit.update({
      where: { userId },
      data: {
        credits: userApiLimit.credits - credits,
      },
    })
  }
}

export const checkApiCredits = async ({
  userId,
  credits,
}: ApiSetCreditsRequest) => {
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  })

  if (!userApiLimit) return false

  return userApiLimit.credits >= credits
}

export const getApiCredits = async ({ userId }: ApiCreditsRequest) => {
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  })

  if (!userApiLimit) return 0

  return userApiLimit.credits
}
