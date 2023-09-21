import { UserTransaction } from "@prisma/client"
import prismadb from "./prismadb"

export const addTransactionToDb = async ({
  id,
  userId,
  stripePriceId,
  stripeCustomerId,
  stripeTransactionId,
  credits,
  quantity,
  createdAt,
}: UserTransaction) => {
  const userTransaction = await prismadb.userTransaction.findUnique({
    where: {
      id,
    },
  })

  if (userTransaction) {
    console.log("Tried adding transaction that already exists")
    return
  }

  await prismadb.userTransaction.create({
    data: {
      id,
      userId,
      stripeCustomerId,
      stripeTransactionId,
      stripePriceId,
      credits,
      quantity,
      createdAt,
    },
  })
}
