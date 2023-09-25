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
  amountPaid,
  currency,
  createdAt,
}: UserTransaction) => {
  const userTransaction = await prismadb.userTransaction.findUnique({
    where: {
      id,
    },
  })

  if (userTransaction) {
    // console.log("Tried adding transaction that already exists")
    throw new Error("Tried adding transaction that already exists")
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
      amountPaid,
      currency,
      createdAt,
    },
  })
}

export const fetchTransactions = async ({ userId }: { userId: string }) => {
  const transactions = await prismadb.userTransaction.findMany({
    where: {
      userId,
    },
  })

  return transactions
}

export const deleteAllTransactions = async ({ userId }: { userId: string }) => {
  await prismadb.userTransaction.deleteMany({
    where: {
      userId,
    },
  })
}
