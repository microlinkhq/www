import { useEffect } from 'react'
import { ensureProtocol } from '../shared'
import { addToHistory, MAX_HISTORY } from './history'

const DEMO_URLS = ['unavatar.io', 'microlink.io']

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
    setShowNerdStats,
    fetchMarkdown,
    fetchResolverRef
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
        await delay(130)
        if (check()) return false
        setInputUrl('https://' + url.slice(0, i))
      }
      await delay(250)
      if (check()) return false
      setIsGlowing(false)
      return true
    }

    const run = async () => {
      fetchMarkdown('https://stripe.com')
      await delay(3200)
      if (check()) return

      for (let i = 0; i < DEMO_URLS.length; i++) {
        const url = DEMO_URLS[i]
        if (check()) return

        if (i === 0) {
          setIsGlowing(true)
          await delay(250)
          if (check()) return
        }

        const completed = await typeUrl(url)
        if (!completed) return

        await delay(50)
        if (check()) return

        const normalized = ensureProtocol(url)
        setInputUrl(normalized)
        setHistory(h => addToHistory(h, normalized))
        setNavStack(s => [...s, normalized].slice(-MAX_HISTORY))
        setNavIndex(Math.min(i + 1, MAX_HISTORY - 1))
        const fetchDone = new Promise(resolve => {
          fetchResolverRef.current = resolve
        })
        setShowNerdStats(false)
        fetchMarkdown(normalized)

        await Promise.race([fetchDone, delay(15000)])
        if (check()) return

        if (i < DEMO_URLS.length - 1) {
          await delay(6000)
          if (check()) return
          setIsGlowing(true)
          await delay(250)
          if (check()) return
          setInputUrl('')
        } else {
          await delay(4000)
          if (check()) return
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
      if (fetchResolverRef.current) {
        fetchResolverRef.current()
        fetchResolverRef.current = null
      }
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
    setShowNerdStats,
    fetchMarkdown,
    fetchResolverRef
  ])
}
