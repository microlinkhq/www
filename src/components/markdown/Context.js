import { createContext, useContext } from 'react'

export const MarkdownContext = createContext({
  isBlogPage: false,
  isGuidesPage: false
})

export const useMarkdownContext = () => useContext(MarkdownContext)
