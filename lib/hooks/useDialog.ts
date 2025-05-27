// components/dialog/hooks.ts
"use client"

import { createContext, use } from "react"

type DialogContextType = {
  closeDialog: () => void
}

export const DialogContext = createContext<DialogContextType | null>(null)

export const useDialog = () => {
  const context = use(DialogContext)
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider")
  }
  return context
}
