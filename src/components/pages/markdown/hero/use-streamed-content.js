import { useEffect, useRef, useState } from 'react'

const STREAM_CHARS_PER_FRAME = 12
const STREAM_CHARS_PER_FRAME_FAST = 120
const STREAM_FRAME_MS = 33
const STREAM_FAST_AFTER_WORDS = 200

export const useStreamedContent = markdownContent => {
  const [displayedContent, setDisplayedContent] = useState('')
  const streamRef = useRef(null)

  useEffect(() => {
    if (!markdownContent) {
      setDisplayedContent('')
      return
    }

    if (streamRef.current) clearTimeout(streamRef.current)

    let pos = 0
    const text = markdownContent

    let fastThreshold = text.length
    let wordCount = 0
    for (let i = 0; i < text.length; i++) {
      if (/\s/.test(text[i]) && i > 0 && !/\s/.test(text[i - 1])) {
        wordCount++
        if (wordCount >= STREAM_FAST_AFTER_WORDS) {
          fastThreshold = i
          break
        }
      }
    }

    const step = () => {
      const chunkSize =
        pos >= fastThreshold
          ? STREAM_CHARS_PER_FRAME_FAST
          : STREAM_CHARS_PER_FRAME
      pos = Math.min(pos + chunkSize, text.length)
      setDisplayedContent(text.slice(0, pos))
      if (pos < text.length) {
        streamRef.current = setTimeout(step, STREAM_FRAME_MS)
      } else {
        streamRef.current = null
      }
    }

    streamRef.current = setTimeout(step, STREAM_FRAME_MS)

    return () => {
      if (streamRef.current) clearTimeout(streamRef.current)
    }
  }, [markdownContent])

  return { displayedContent, streamRef }
}
