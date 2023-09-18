import { initNewApiUser } from "@/lib/api-limits"
import prismadb from "@/lib/prismadb"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  context: { params: { userId: string } }
) {
  if (req.method !== "GET")
    return new NextResponse("Method not allowed", { status: 405 })

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId: context.params.userId },
  })

  if (!userApiLimit) {
    const newUserApiLimit = await initNewApiUser({
      userId: context.params.userId,
    })
    return new NextResponse(JSON.stringify(newUserApiLimit))
  }

  return new NextResponse(JSON.stringify(userApiLimit))
}
