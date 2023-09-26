import { ConversationModesEnum } from "@/app/(dashboard)/(routes)/conversation/constant"
import { ConversationMessage } from "@/app/(dashboard)/(routes)/conversation/page"
import { create } from "zustand"

interface useConversationStore {
  messagesState: ConversationMessage[]
  setMessagesState: (
    callback: (prevState: ConversationMessage[]) => ConversationMessage[]
  ) => void
  selectedMode: ConversationModesEnum
  setSelectedMode: (mode: ConversationModesEnum) => void
}

export const useConversation = create<useConversationStore>((set) => {
  return {
    messagesState: [],
    setMessagesState: (callback) => {
      set((state) => ({
        messagesState: callback(state.messagesState),
      }))
    },
    selectedMode: "all",
    setSelectedMode: (mode: ConversationModesEnum) =>
      set({ selectedMode: mode }),
  }
})
