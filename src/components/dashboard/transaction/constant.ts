import * as z from "zod"

export const transactionFormSchema = z.object({
  priceId: z.string().nonempty({
    message: "Package choice is required",
  }),
  quantity: z.number().int().min(1, {
    message: "Quantity must be at least 1",
  }),
})
