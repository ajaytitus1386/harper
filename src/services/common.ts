export type PredictionRequest = {
  id: string
  status: string
}

export type PredictionResponse = {
  id: string
  version: string
  input: object
  logs: string
  output: string[]
  error: object
  status: string
  created_at: Date
  started_at: Date
  completed_at: Date
  metrics: {
    predict_time: number
  }
  urls: {
    cancel: string
    get: string
  }
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/**
 * Recursive Function to poll the status of a prediction.
 * @param prediction - The prediction object containing the ID and initial status of the prediction.
 * @param apiRoute - The API route to poll for the status of the prediction in the format `"/<route_name>"` (e.g. "/conversation").
 * @returns A promise that resolves to a PredictionResponse object containing the final prediction output.
 */
export const pollPredictionStatus: (
  prediction: PredictionRequest,
  apiRoute: string
) => Promise<PredictionResponse> = async (prediction, apiRoute) => {
  let predictionStatus = prediction.status
  let predictionOutput: PredictionResponse

  // sleep
  await sleep(2000)
  //
  const response = await fetch("/api" + apiRoute + "/" + prediction.id, {
    method: "GET",
  })
  const json: PredictionResponse = await response.json()
  if (response.status !== 200) {
    console.log("error in polling", response)
  }
  console.log("Response from status poll: ", response)
  console.log("the json is: ", json)

  predictionStatus = json.status
  predictionOutput = json

  // if (json.output != null) return predictionOutput
  if (predictionStatus === "succeeded" || predictionStatus === "failed")
    return predictionOutput
  else return await pollPredictionStatus(prediction, apiRoute)

  // while (predictionStatus !== "succeeded" && predictionStatus !== "failed") {}

  // return predictionOutput
}
