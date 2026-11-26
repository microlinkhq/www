import { useEffect, useState } from 'react'
import microlink from 'helpers/microlink'
import { isSignedIn } from 'helpers/session-request'

export const PENDING = { phase: 'pending' }
export const KEYLESS = { phase: 'keyless' }
export const IDLE = { phase: 'idle' }
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

export const loadSessionCard = async (
  url,
  options,
  { signedIn = isSignedIn, request = microlink.request } = {}
) => {
  if (!signedIn()) return KEYLESS
  try {
    const { data } = await request(url, cardOptions(options))
    return { phase: 'session', data }
  } catch {
    return FAILED
  }
}

export const useSessionCard = (url, { enabled, media, ...options }) => {
  const [card, setCard] = useState(enabled ? PENDING : IDLE)
  const mediaKey = [].concat(media).join(',')
  useEffect(() => {
    if (!enabled) {
      setCard(IDLE)
      return
    }
    let live = true
    setCard(PENDING)
    loadSessionCard(url, { ...options, media: mediaKey.split(',') }).then(
      next => {
        if (live) setCard(next)
      }
    )
    return () => {
      live = false
    }
  }, [url, enabled, mediaKey])
  return card
}
