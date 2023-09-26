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

  const { usedCredits, totalCredits } = await getApiCredits({ userId })

  if (usedCredits >= totalCredits) {
    return new NextResponse("User API limit reached", { status: 403 })
  }

  const remainingCredits = totalCredits - usedCredits

  const maxTokenLimit = CONVERSATION_TOKENS_PER_CREDIT * remainingCredits

  try {
    const response = await axios.post(
      "https://api.replicate.com/v1/predictions",
      {
        version:
          "35042c9a33ac8fd5e29e27fb3197f33aa483f72c2ce3b0b9d201155c7fd2a287",
        input: {
          prompt:
            `[INST] Format your response in markdown using spaces, breaks and bold text. Limit the response to a total of ${maxTokenLimit} words [/INST]` +
            prompt,
          // max_new_tokens: 25,
          max_new_tokens:
            process.env.NODE_ENV === "production" ? maxTokenLimit : 250,
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

    const prediction = response.data

    return new NextResponse(JSON.stringify(prediction), { status: 201 })
  } catch (error: any) {
    if (error?.response?.status == 402) {
      return new NextResponse(
        "We're having some trouble on our end. Please try again later.",
        { status: 402 }
      )
    }

    if (error?.response?.status !== 201) {
      let msg = error?.response?.data.detail

      return new NextResponse(msg, { status: 500 })
    }

    return new NextResponse(error?.data, { status: 500 })
  }
}
