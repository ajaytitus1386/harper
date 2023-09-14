import { create } from "zustand"

interface useTransactionModalStore {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const useTransactionModal = create<useTransactionModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}))
