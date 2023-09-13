import { NextRequest, NextResponse } from "next/server"
import axios from "axios"
import { auth } from "@clerk/nextjs/server"
import { addToApiUsedCredits } from "@/lib/api-limits"

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  if (req.method !== "GET") {
    return new NextResponse("Method not allowed", { status: 405 })
  }

  const { userId } = auth()
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const response = await axios.get(
    "https://api.replicate.com/v1/predictions/" + context.params.id,
    {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      },
    }
  )

  if (response.status !== 200) {
    let error = response.data
    return new NextResponse(error.detail, { status: 500 })
  }

  const prediction = response.data

  // If the prediction is complete, charge the users credits
  if (prediction.status === "succeeded" || prediction.status === "failed") {
    await addToApiUsedCredits({ userId, credits: prediction?.output?.length })
  }

  return new NextResponse(JSON.stringify(prediction))
}
