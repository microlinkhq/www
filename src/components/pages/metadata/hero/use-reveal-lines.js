import { useEffect, useState } from 'react'

const STREAM_MS_PER_LINE = 40

export const useRevealLines = (totalLines, signature) => {
  const [revealed, setRevealed] = useState(0)

  useEffect(() => {
    setRevealed(0)
    const timers = []
    for (let i = 1; i <= totalLines; i++) {
      timers.push(setTimeout(() => setRevealed(i), i * STREAM_MS_PER_LINE))
    }
    return () => timers.forEach(clearTimeout)
  }, [totalLines, signature])

  return revealed
}
