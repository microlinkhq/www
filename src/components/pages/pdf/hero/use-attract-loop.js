import { useEffect } from 'react'
import { ensureProtocol, stripProtocol } from './url'
import { addToHistory, MAX_HISTORY } from './history'

const DEMO_URLS = ['https://nav.al/david-deutsch', 'https://plausible.io']

export const useAttractLoop = ({ hasInteracted, actions }) => {
  const {
    setInputUrl,
    setIsGlowing,
    setIsFocused,
    setIsAttractMode,
    setIsPulsing,
    setHistory,
    setNavStack,
    setNavIndex,
    fetchPdf
  } = actions

  useEffect(() => {
    if (hasInteracted) return

    const timeouts = []
    let cancelled = false
    const delay = ms =>
      new Promise(resolve => {
        timeouts.push(setTimeout(resolve, ms))
      })
    const check = () => cancelled || hasInteracted

    const typeUrl = async url => {
      setInputUrl('')
      for (let i = 1; i <= url.length; i++) {
        await delay(65)
        if (check()) return false
        setInputUrl('https://' + url.slice(0, i))
      }
      await delay(250)
      if (check()) return false
      setIsGlowing(false)
      return true
    }

    const run = async () => {
      await delay(5000)
      if (check()) return

      for (let i = 0; i < DEMO_URLS.length; i++) {
        const url = DEMO_URLS[i]
        if (check()) return

        setIsGlowing(true)
        await delay(250)
        if (check()) return

        const completed = await typeUrl(stripProtocol(url))
        if (!completed) return

        await delay(50)
        if (check()) return

        const normalized = ensureProtocol(url)
        setInputUrl(normalized)
        setHistory(h => addToHistory(h, normalized))
        setNavStack(s => [...s, normalized].slice(-MAX_HISTORY))
        setNavIndex(Math.min(i + 1, MAX_HISTORY - 1))
        fetchPdf(normalized)

        await delay(8000)
        if (check()) return

        if (i >= DEMO_URLS.length - 1) {
          setIsGlowing(true)
          setIsFocused(true)
          setIsAttractMode(true)
          setIsPulsing(true)
          await delay(5000)
          if (check()) return
          setIsPulsing(false)
        }
      }
    }

    run()

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
    }
  }, [
    hasInteracted,
    setInputUrl,
    setIsGlowing,
    setIsFocused,
    setIsAttractMode,
    setIsPulsing,
    setHistory,
    setNavStack,
    setNavIndex,
    fetchPdf
  ])
}
