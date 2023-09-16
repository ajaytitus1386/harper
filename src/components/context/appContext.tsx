"use client"

import { ReactNode, createContext, useContext } from "react"

const AppContext = createContext({})

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  return useContext(AppContext)
}
