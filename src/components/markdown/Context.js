import { createContext, useContext } from 'react'

export const MarkdownContext = createContext({ isBlogPage: false })

export const useMarkdownContext = () => useContext(MarkdownContext)
