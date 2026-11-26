import { useEffect, useState } from 'react'
import microlink from 'helpers/microlink'
import { isSignedIn } from 'helpers/session-request'

export const PENDING = { phase: 'pending' }
export const KEYLESS = { phase: 'keyless' }
export const IDLE = { phase: 'idle' }
export const FAILED = { phase: 'failed' }

const CARD_INPUT_FIELDS = [
  'contrast',
  'data',
  'force',
  'headers',
  'prerender',
  'proxy',
  'ttl'
]

const cardRequestInput = (media, options) => ({
  media: [].concat(media ?? []),
  ...Object.fromEntries(
    CARD_INPUT_FIELDS.flatMap(field =>
      options[field] === undefined ? [] : [[field, options[field]]]
    )
  )
})

export const cardOptions = ({ media, ...options }) => {
  const {
    media: mediaList,
    contrast,
    data,
    force,
    headers,
    prerender,
    proxy,
    ttl
  } = cardRequestInput(media, options)
  return Object.fromEntries(
    Object.entries({
      audio: mediaList.includes('audio'),
      iframe: mediaList.includes('iframe'),
      screenshot: mediaList.includes('screenshot'),
      video: mediaList.includes('video'),
      palette: contrast,
      data,
      force,
      headers,
      prerender,
      proxy,
      ttl
    }).filter(([, value]) => value !== undefined)
  )
}

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
  const requestKey = JSON.stringify(cardRequestInput(media, options))
  useEffect(() => {
    if (!enabled) {
      setCard(IDLE)
      return
    }
    let live = true
    setCard(PENDING)
    loadSessionCard(url, JSON.parse(requestKey)).then(next => {
      if (live) setCard(next)
    })
    return () => {
      live = false
    }
  }, [url, enabled, requestKey])
  return card
}
