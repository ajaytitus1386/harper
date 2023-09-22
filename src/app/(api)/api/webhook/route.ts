import Stripe from "stripe"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import { NextRequest, NextResponse } from "next/server"
import { CheckoutMetadata } from "../stripe/route"
import { addTransactionToDb } from "@/lib/api-transaction"
import { addToApiTotalCredits } from "@/lib/api-limits"

export async function POST(req: NextRequest) {
  const endpointSecret = process.env.STRIPE_API_WEBHOOK_KEY as string

  const payload = await req.text()

  const sig = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
  } catch (error) {
    return new NextResponse("Webhook error: " + error, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session
  console.log(session)

  switch (event.type) {
    case "checkout.session.completed":
      const metadata = session.metadata as any as CheckoutMetadata

      await addTransactionToDb({
        id: session.id,
        userId: metadata.userId,
        stripeCustomerId: session.customer_details?.email || metadata.userId,
        stripePriceId: metadata.priceId,
        stripeTransactionId: session.payment_intent as string,
        credits: Number(metadata.credits),
        quantity: Number(metadata.quantity),
        createdAt: new Date(session.created),
      })

      await addToApiTotalCredits({
        userId: metadata.userId,
        credits: Number(metadata.credits) * Number(metadata.quantity),
      })

      break

    default:
      break
  }

  return new NextResponse("Webhook received", { status: 200 })
}
