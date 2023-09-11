import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

type ConversationBody = {
  prompt: string
}

export async function POST(req: NextRequest) {
  const { prompt }: ConversationBody = await req.json()

  if (req.method !== "POST") {
    return new NextResponse("Method not allowed", { status: 405 })
  }

  const response = await axios.post(
    "https://api.replicate.com/v1/predictions",
    {
      version:
        "35042c9a33ac8fd5e29e27fb3197f33aa483f72c2ce3b0b9d201155c7fd2a287",
      input: { prompt, max_new_tokens: 64 },
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
