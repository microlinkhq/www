import { useCallback, useEffect, useRef } from 'react'

const INTRO_DELAY_PER_LANE = 800

export const useRaceSchedule = ({
  benchmarkData,
  ALPHABETICAL_SERVICES,
  getColdDuration,
  initCumulativeTimes,
  getRankedOrder,
  getCumulativeAtStep,
  phase,
  setPhase,
  setIntroHighlight,
  setStep,
  setActiveStep,
  setModeIndex,
  setDisplayedCumulative,
  setRankedOrder,
  setLeaderboardEntered,
  setIsReordering,
  setIsSumming,
  setIsAnnouncing,
  setAnnouncingUrl,
  cumulativeTimesRef,
  rankedOrderRef,
  stepRef,
  modeTimerRef,
  hasAutoStarted
}) => {
  const introTimerRef = useRef(null)
  const pendingTimers = useRef([])

  const schedule = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms)
    pendingTimers.current.push(id)
    return id
  }, [])

  const clearPending = useCallback(() => {
    pendingTimers.current.forEach(clearTimeout)
    pendingTimers.current = []
  }, [])

  const scheduleNextBars = useCallback(() => {
    const currentStep = stepRef.current
    const url = benchmarkData.testUrls[currentStep]?.url

    const prev = cumulativeTimesRef.current
    const next = { ...prev }
    ALPHABETICAL_SERVICES.forEach(key => {
      next[key] = prev[key] + getColdDuration(key, url)
    })
    cumulativeTimesRef.current = next

    schedule(() => {
      setIsSumming(true)
      setDisplayedCumulative(next)

      schedule(() => {
        setIsSumming(false)
        const newOrder = getRankedOrder(next)
        const orderChanged = newOrder.some(
          (k, i) => k !== rankedOrderRef.current[i]
        )

        const advance = () => {
          setIsReordering(false)
          const nextStep = currentStep + 1
          if (nextStep >= benchmarkData.testUrls.length) {
            setPhase('finished')
          } else {
            stepRef.current = nextStep
            setActiveStep(nextStep)
            setAnnouncingUrl(benchmarkData.testUrls[nextStep]?.url)
            setIsAnnouncing(true)
            schedule(() => {
              schedule(() => {
                setIsAnnouncing(false)
                setAnnouncingUrl(null)
                setStep(nextStep)
                scheduleNextBars()
              }, 300)
            }, 1500)
          }
        }

        if (orderChanged) {
          schedule(() => {
            setIsReordering(true)
            setRankedOrder(newOrder)
            rankedOrderRef.current = newOrder
            schedule(advance, 2000)
          }, 1000)
        } else {
          setRankedOrder(newOrder)
          rankedOrderRef.current = newOrder
          schedule(advance, 500)
        }
      }, 1000)
    }, 1500)
  }, [schedule])

  const scheduleNext = useCallback(() => {
    const url = benchmarkData.testUrls[stepRef.current]?.url
    setActiveStep(stepRef.current)
    setAnnouncingUrl(url)
    setIsAnnouncing(true)

    schedule(() => {
      schedule(() => {
        setIsAnnouncing(false)
        setAnnouncingUrl(null)
        setStep(stepRef.current)
        scheduleNextBars()
      }, 300)
    }, 1500)
  }, [schedule, scheduleNextBars])

  const jumpToStep = useCallback(
    targetStep => {
      clearPending()
      setIsReordering(false)
      setIsSumming(false)

      const prevCum =
        targetStep > 0
          ? getCumulativeAtStep(targetStep - 1)
          : initCumulativeTimes()
      const order =
        targetStep > 0 ? getRankedOrder(prevCum) : ALPHABETICAL_SERVICES

      stepRef.current = targetStep
      setActiveStep(targetStep)
      cumulativeTimesRef.current = prevCum
      setDisplayedCumulative(prevCum)
      setRankedOrder(order)
      rankedOrderRef.current = order
      setAnnouncingUrl(benchmarkData.testUrls[targetStep]?.url)
      setIsAnnouncing(true)

      schedule(() => {
        schedule(() => {
          setIsAnnouncing(false)
          setAnnouncingUrl(null)
          setStep(targetStep)
          const cum = getCumulativeAtStep(targetStep)

          cumulativeTimesRef.current = cum

          schedule(() => {
            setIsSumming(true)
            setDisplayedCumulative(cum)

            schedule(() => {
              setIsSumming(false)
              const newOrder = getRankedOrder(cum)
              const orderChanged = newOrder.some(
                (k, i) => k !== rankedOrderRef.current[i]
              )

              const advance = () => {
                setIsReordering(false)
                const nextStep = targetStep + 1
                if (nextStep >= benchmarkData.testUrls.length) {
                  setPhase('finished')
                } else {
                  stepRef.current = nextStep
                  setActiveStep(nextStep)
                  setAnnouncingUrl(benchmarkData.testUrls[nextStep]?.url)
                  setIsAnnouncing(true)
                  schedule(() => {
                    schedule(() => {
                      setIsAnnouncing(false)
                      setAnnouncingUrl(null)
                      setStep(nextStep)
                      scheduleNextBars()
                    }, 300)
                  }, 1500)
                }
              }

              if (orderChanged) {
                schedule(() => {
                  setIsReordering(true)
                  setRankedOrder(newOrder)
                  rankedOrderRef.current = newOrder
                  schedule(advance, 2600)
                }, 1000)
              } else {
                setRankedOrder(newOrder)
                rankedOrderRef.current = newOrder
                schedule(advance, 500)
              }
            }, 1000)
          }, 2300)
        }, 300)
      }, 1500)
    },
    [schedule, clearPending, scheduleNext]
  )

  const startRace = useCallback(() => {
    clearPending()
    stepRef.current = 0
    setStep(-1)
    setActiveStep(0)
    const fresh = initCumulativeTimes()
    cumulativeTimesRef.current = fresh
    setDisplayedCumulative(fresh)
    setRankedOrder(ALPHABETICAL_SERVICES)
    rankedOrderRef.current = ALPHABETICAL_SERVICES
    setIsReordering(false)
    setIsSumming(false)
    setIsAnnouncing(false)
    setAnnouncingUrl(null)
    setLeaderboardEntered(false)
    setPhase('racing')
    setModeIndex(0)
    if (modeTimerRef.current) {
      clearTimeout(modeTimerRef.current)
      modeTimerRef.current = null
    }
    setTimeout(() => scheduleNext(), 0)
  }, [scheduleNext])

  const startIntro = useCallback(() => {
    if (hasAutoStarted.current) return
    hasAutoStarted.current = true
    setPhase('intro')
    setIntroHighlight(-1)

    const lastIndex = ALPHABETICAL_SERVICES.length - 1
    let i = 0
    introTimerRef.current = setInterval(() => {
      if (i <= lastIndex) {
        setIntroHighlight(i)
        i++
      } else {
        clearInterval(introTimerRef.current)
        introTimerRef.current = null
        setIntroHighlight(lastIndex + 1)
        setTimeout(() => startRace(), 1000)
      }
    }, INTRO_DELAY_PER_LANE)
  }, [startRace])

  const replay = useCallback(() => {
    if (phase === 'racing') return
    startRace()
  }, [phase, startRace])

  useEffect(() => {
    return () => {
      if (introTimerRef.current) clearInterval(introTimerRef.current)
    }
  }, [])

  return { jumpToStep, startIntro, replay }
}
