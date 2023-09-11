import { PredictionRequest, PredictionResponse, sleep } from "./common"

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

  // const output = await pollPredictionStatus(prediction, "/conversation")
  // console.log("The output after polling is: ", output)

  // return output
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
  const response = await fetch("/api/conversation/" + prediction.id, {
    method: "GET",
  })
  const json: PredictionResponse = await response.json()
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
