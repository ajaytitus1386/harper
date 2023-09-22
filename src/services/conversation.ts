import axios from "axios"
import { PredictionRequest, PredictionResponse, sleep } from "./common"

export const getConversationCompletion = async (prompt: string) => {
  const response = await axios.post(
    "/api/conversation",
    {
      prompt,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  let prediction: PredictionRequest = response.data

  return prediction
}

export const pollConversationCompletion: ({
  prediction,
  setOutput,
}: {
  prediction: PredictionRequest
  setOutput: (output: PredictionResponse) => void
}) => Promise<null> = async ({ prediction, setOutput }) => {
  let predictionStatus = prediction.status
  let predictionOutput: PredictionResponse

  // sleep
  await sleep(2000)
  //
  const response = await axios.get("/api/conversation/" + prediction.id)

  const json: PredictionResponse = response.data
  if (response.status !== 200) {
    return null
  }

  predictionStatus = json.status
  predictionOutput = json

  // Append the new output to the existing output
  setOutput(predictionOutput)

  if (predictionStatus === "succeeded" || predictionStatus === "failed")
    return null
  else return await pollConversationCompletion({ prediction, setOutput })
}
