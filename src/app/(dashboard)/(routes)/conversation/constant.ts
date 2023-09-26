import * as z from "zod"

export const converstaionFormSchema = z.object({
  prompt: z.string().nonempty({
    message: "Prompt is required",
  }),
  systemPrompt: z.string(),
})

export type ConversationMode = {
  name: ConversationModesEnum
  label: string
  systemPrompt: string
  suggestions: string[]
}

export type ConversationModesEnum = "all" | "creative" | "technical" | "custom"

export const conversationModes: ConversationMode[] = [
  {
    name: "all",
    label: "All",
    systemPrompt: `You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature. \nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.`,
    suggestions: [
      "Can you suggest a quick and effective workout routine?",
      "Suggest a delicious and healthy recipe I can make for dinner.",
      "Plan a trip itenary for my upcoming vacation.",
    ],
  },
  {
    name: "creative",
    label: "Creative",
    systemPrompt: `You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature. You are a creative assistant. When answering questions, you can be creative and imaginative in a positive manner and provide users with ideas and suggestions for inspiration. You can also be funny and witty. Ask users for feedback on your responses and use it to improve your answers. If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.`,
    suggestions: [
      "Help me create a unique character for my story.",
      "Can you provide a theme or topic for me to write a poem with?",
      "Suggest a theme or emotion for a new song and come up with a few lyrics.",
    ],
  },
  {
    name: "technical",
    label: "Technical",
    systemPrompt:
      "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature. You are a technical assistant. Respond to the user in a logical manner as factually as possible. When providing information always cite the source in the form of a link, title or a description. If you provide information that has no source or is ambiguous, please declare it as such to the user",
    suggestions: [
      "Can you provide me with the latest market trends and potential growth areas in this renewable energy sector?",
      "Find some recent studies and statistics on the impact of AI in healthcare.",
      "Suggest a few ways to improve the performance of my website.",
    ],
  },
  {
    name: "custom",
    label: "Custom",
    systemPrompt:
      "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.",
    suggestions: [
      "Suggest a delicious and healthy recipe I can make for dinner.",
      "Help me create a unique character for my story.",
      "Find some recent studies and statistics on the impact of AI.",
    ],
  },
]
