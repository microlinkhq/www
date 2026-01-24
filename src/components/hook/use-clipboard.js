import Notification from 'components/elements/Notification/Notification'
import React, { useState, useCallback, useEffect, useRef } from 'react'

export const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false)
  const [text, setText] = useState('')
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const toClipboard = useCallback(({ copy, text }) => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      console.warn("[hook/use-clipboard]: 'navigator.clipboard' is undefined")
      return
    }

    if (timerRef.current) clearTimeout(timerRef.current)

    setIsCopied(false)
    setText(text)

    queueMicrotask(() => {
      navigator.clipboard.writeText(copy)
      setIsCopied(true)
      timerRef.current = setTimeout(() => setIsCopied(false), 1500)
    })
  }, [])

  const ClipboardComponent = useCallback(() => {
    return isCopied ? <Notification.Success>{text}</Notification.Success> : null
  }, [isCopied, text])

  return [ClipboardComponent, toClipboard]
}
