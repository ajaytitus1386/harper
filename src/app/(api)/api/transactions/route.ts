import { fetchTransactions } from "@/lib/api-transaction"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET() {
  const { userId } = auth()
  if (!userId) return new NextResponse("Not Authorized", { status: 401 })

  const transactions = await fetchTransactions({
    userId,
  })

  return new NextResponse(JSON.stringify(transactions))
}
