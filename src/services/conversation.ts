import { PredictionRequest, pollPredictionStatus } from "./common"

export const getConversationCompletion = async (prompt: string) => {
  const response = await fetch("/api/conversation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  })

  let prediction: PredictionRequest = await response.json()
  console.log("The prediction request is: ", prediction)

  const output = await pollPredictionStatus(prediction, "/conversation")
  console.log("The output after polling is: ", output)

  return output
}
