import { deleteAllTransactions } from "@/lib/api-transaction"
import { clerkClient } from "@clerk/nextjs/server"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(req: NextRequest) {
  const { userId } = auth()

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    await clerkClient.users.deleteUser(userId)
    await deleteAllTransactions({ userId })

    return new NextResponse("User deleted", { status: 200 })
  } catch (error) {
    return new NextResponse("Error deleting user", { status: 500 })
  }
}
