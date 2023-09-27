import * as z from "zod"

export const transactionFormSchema = z.object({
  priceId: z.string().nonempty({
    message: "Package choice is required",
  }),
  quantity: z.number().int().min(1, {
    message: "Quantity must be at least 1",
  }),
})

// Live price IDs
export type TransactionOptionContent = {
  name: string
  priceId: string
  credits: number
  price: number
  unit: string
  isRecommended: boolean
}

export const transactionOptions: TransactionOptionContent[] = [
  {
    name: "Basic: 250 words of Conversation responses",
    priceId: "price_1NuuHCSCc7vncoJQNbpvRR2N",
    credits: 10,
    price: 10,
    unit: "INR",
    isRecommended: false,
  },
  {
    name: "Regular: 1250 words of Conversation responses",
    priceId: "price_1NuuGBSCc7vncoJQuB7wrVqx",
    credits: 50,
    price: 50,
    unit: "INR",
    isRecommended: true,
  },
  {
    name: "Premium: 2500 words of Conversation responses",
    priceId: "price_1NuuGmSCc7vncoJQAm2BV5p7",
    credits: 100,
    price: 100,
    unit: "INR",
    isRecommended: false,
  },
]
