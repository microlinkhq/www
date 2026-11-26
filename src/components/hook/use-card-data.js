import { useCallback, useEffect, useState } from 'react'
import microlink from 'helpers/microlink'

export const IDLE = { phase: 'idle' }
export const LOADING = { phase: 'loading' }
export const FAILED = { phase: 'failed' }

export const cardOptions = ({
  media,
  contrast,
  data,
  force,
  headers,
  prerender,
  proxy,
  ttl
}) =>
  Object.fromEntries(
    Object.entries({
      audio: media.includes('audio'),
      iframe: media.includes('iframe'),
      screenshot: media.includes('screenshot'),
      video: media.includes('video'),
      palette: contrast,
      data,
      force,
      headers,
      prerender,
      proxy,
      ttl
    }).filter(([, value]) => value !== undefined)
  )

export const loadCardData = async (
  url,
  options,
  request = microlink.request
) => {
  try {
    const { data } = await request(url, options)
    return { phase: 'ready', data }
  } catch {
    return FAILED
  }
}

export const isLazy = (lazy, Observer = globalThis.IntersectionObserver) =>
  typeof Observer === 'function' && (lazy === true || typeof lazy === 'object')

const useVisible = (enabled, lazy) => {
  const [visible, setVisible] = useState(false)
  const lazyKey = JSON.stringify(lazy)
  const ref = useCallback(
    node => {
      if (!enabled || node === null) return
      if (!isLazy(lazy)) {
        setVisible(true)
        return
      }
      const observer = new globalThis.IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          setVisible(true)
          observer.disconnect()
        },
        typeof lazy === 'object' ? lazy : undefined
      )
      observer.observe(node)
    },
    [enabled, lazyKey]
  )
  return [visible, ref]
}

export const useCardData = (url, { enabled, lazy = true, ...query }) => {
  const [card, setCard] = useState(enabled ? LOADING : IDLE)
  const [visible, ref] = useVisible(enabled, lazy)
  const optionsKey = JSON.stringify(
    cardOptions({ ...query, media: [].concat(query.media) })
  )
  useEffect(() => {
    if (!enabled) {
      setCard(IDLE)
      return
    }
    setCard(LOADING)
    if (!visible) return
    let live = true
    loadCardData(url, JSON.parse(optionsKey)).then(next => {
      if (live) setCard(next)
    })
    return () => {
      live = false
    }
  }, [url, enabled, visible, optionsKey])
  return [card, ref]
}
