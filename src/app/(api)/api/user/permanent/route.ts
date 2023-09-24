import { makePermanentApiUser } from "@/lib/api-limits"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST() {
  const { userId } = auth()
  if (!userId) return new NextResponse("Not Authorized", { status: 401 })

  await makePermanentApiUser({ userId: userId })

  return new NextResponse("User is now permanent", { status: 200 })
}
