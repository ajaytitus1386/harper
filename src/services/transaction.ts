import { TransactionFormBody } from "@/app/(api)/api/stripe/route"
import axios from "axios"

export const submitTransactionForm = async (body: TransactionFormBody) => {
  try {
    const res = await axios.post("/api/stripe", {})
    return res
  } catch (error) {
    console.log(error)
    // throw new Error("Error submitting transaction form: " + error)
  }
}
