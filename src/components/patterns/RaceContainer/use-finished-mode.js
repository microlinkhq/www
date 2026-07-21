import { useEffect } from 'react'

export const useFinishedMode = ({
  phase,
  setLeaderboardEntered,
  setModeIndex,
  modeTimerRef
}) => {
  useEffect(() => {
    if (phase === 'finished') {
      const t = setTimeout(() => setLeaderboardEntered(true), 1000)
      modeTimerRef.current = setTimeout(() => {
        setModeIndex(1)
        modeTimerRef.current = null
      }, 5000)
      return () => {
        clearTimeout(t)
        if (modeTimerRef.current) clearTimeout(modeTimerRef.current)
      }
    } else if (modeTimerRef.current) {
      clearTimeout(modeTimerRef.current)
      modeTimerRef.current = null
    }
    return () => {
      if (modeTimerRef.current) clearTimeout(modeTimerRef.current)
    }
  }, [phase, setLeaderboardEntered, setModeIndex, modeTimerRef])
}
