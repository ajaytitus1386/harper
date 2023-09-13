import { CONVERSATION_TOKENS_PER_CREDIT } from "@/lib/api-constants"
import { getApiCredits } from "@/lib/api-limits"
import { auth } from "@clerk/nextjs"
import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

export type ConversationRequestBody = {
  prompt: string
}

export async function POST(req: NextRequest) {
  const { prompt }: ConversationRequestBody = await req.json()

  if (req.method !== "POST") {
    return new NextResponse("Method not allowed", { status: 405 })
  }

  const { userId } = auth()
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const userCreditCount = await getApiCredits({ userId })

  if (!userCreditCount) {
    return new NextResponse("User API limit reached", { status: 403 })
  }

  const response = await axios.post(
    "https://api.replicate.com/v1/predictions",
    {
      version:
        "35042c9a33ac8fd5e29e27fb3197f33aa483f72c2ce3b0b9d201155c7fd2a287",
      input: {
        prompt,
        max_new_tokens: 4,
        // max_new_tokens: CONVERSATION_TOKENS_PER_CREDIT * userCreditCount,
      },
    },
    {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  )

  if (response.status !== 201) {
    let error = response.data

    return new NextResponse(error.detail, { status: 500 })
  }

  const prediction = response.data

  return new NextResponse(JSON.stringify(prediction), { status: 201 })
}
