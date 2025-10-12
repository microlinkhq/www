import Notification from 'components/elements/Notification/Notification'
import React, { useState } from 'react'

export const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false)
  const [pendingTimer, setPendingTimer] = useState(null)
  const [text, setText] = useState('')

  const toClipboard = ({ copy, text }) => {
    if (!navigator.clipboard) {
      console.warn("[hook/use-clipboard]: 'navigator.clipboard' is undefined")
      return
    }

    clearTimeout(pendingTimer)
    setIsCopied(false)
    setText(text)

    queueMicrotask(() => {
      navigator.clipboard.writeText(copy)
      setIsCopied(true)
      setPendingTimer(setTimeout(setIsCopied, 1500, false))
    })
  }

  const ClipboardComponent = () => {
    if (isCopied) {
      return <Notification.Success>{text}</Notification.Success>
    }
  }

  return [ClipboardComponent, toClipboard]
}
