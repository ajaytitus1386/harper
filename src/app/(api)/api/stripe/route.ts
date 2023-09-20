import { stripe } from "@/lib/stripe"
import { absoluteUrl } from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server"

export type TransactionFormBody = {
  priceId: string
  quantity: number
}

export async function POST(req: NextRequest) {
  if (req.method !== "POST")
    return new NextResponse("Method not allowed", { status: 405 })

  if (!req.body) {
    return new NextResponse("No body provided", { status: 400 })
  }

  const { priceId, quantity }: TransactionFormBody = await req.json()

  console.log("Received transaction form body: ", priceId, quantity)

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          //price_1NrxVwSCc7vncoJQ9USQdKHv
          price: priceId,
          quantity: quantity,
        },
      ],
      mode: "payment",
      success_url: absoluteUrl("/dashboard?success=true"),
      cancel_url: absoluteUrl("/dashboard?canceled=true"),
    })

    if (!session.url)
      return new NextResponse("Error creating Stripe session", { status: 500 })

    return new NextResponse(JSON.stringify({ url: session.url }), {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new NextResponse("Error making checkout session", { status: 500 })
  }
}
