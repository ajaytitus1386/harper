import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  if (req.method !== "GET") {
    return new NextResponse("Method not allowed", { status: 405 })
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
  return new NextResponse(JSON.stringify(prediction))
}
