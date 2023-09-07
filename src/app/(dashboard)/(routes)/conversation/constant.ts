import * as z from "zod"

export const converstaionFormSchema = z.object({
  prompt: z.string().nonempty({
    message: "Prompt is required",
  }),
})

type ConversationMode = {
  name: string
  label: string
  systemPrompt: string
  suggestions: string[]
}
export const conversationModes: ConversationMode[] = [
  {
    name: "all",
    label: "All",
    systemPrompt: "All",
    suggestions: [
      "Can you suggest a quick and effective workout routine?",
      "Suggest a delicious and healthy recipe I can make for dinner.",
      "Plan a trip itenary for my upcoming vacation.",
    ],
  },
  {
    name: "creative",
    label: "Creative",
    systemPrompt: "Creative",
    suggestions: [
      "Help me create a unique character for my story.",
      "Can you provide a theme or topic for me to write a poem with?",
      "Suggest a theme or emotion for a new song and come up with a few lyrics.",
    ],
  },
  {
    name: "technical",
    label: "Technical",
    systemPrompt: "Technical",
    suggestions: [
      "Can you provide me with the latest market trends and potential growth areas in this renewable energy sector?",
      "Find some recent studies and statistics on the impact of AI in healthcare.",
      "Suggest a few ways to improve the performance of my website.",
    ],
  },
  {
    name: "custom",
    label: "Custom",
    systemPrompt: "Custom",
    suggestions: [
      "Suggest a delicious and healthy recipe I can make for dinner.",
      "Help me create a unique character for my story.",
      "Find some recent studies and statistics on the impact of AI.",
    ],
  },
]
