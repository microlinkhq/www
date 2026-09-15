import { theme } from 'theme'
import React, { useCallback, useEffect, useRef, useState } from 'react'

export const NEWSLETTER_ACTION =
  'https://api.sequenzy.com/api/v1/forms/g5216m96m83faetazev1zr0m'

const SUCCESS_MESSAGE = 'You’re subscribed. We’ll email you about new releases.'
const ERROR_MESSAGE = 'Something went wrong. Please try again.'

export const NewsletterHoneypot = () => (
  <div
    aria-hidden='true'
    css={theme({ position: 'absolute', left: '-9999px' })}
  >
    <input name='website' type='text' tabIndex={-1} autoComplete='off' />
  </div>
)

export const useNewsletter = () => {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const controllerRef = useRef(null)

  useEffect(() => () => controllerRef.current?.abort(), [])

  const onSubmit = useCallback(async event => {
    event.preventDefault()
    const form = event.currentTarget
    const body = new FormData(form)
    body.set('email', String(body.get('email') || '').trim())

    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' },
        signal: controller.signal
      })
      if (!response.ok) {
        const data = await response.json().catch(() => null)
        if (controller.signal.aborted) return
        setStatus('error')
        setMessage(data?.message || ERROR_MESSAGE)
        return
      }

      if (controller.signal.aborted) return
      form.reset()
      setStatus('success')
      setMessage(SUCCESS_MESSAGE)
    } catch {
      if (controller.signal.aborted) return
      setStatus('error')
      setMessage(ERROR_MESSAGE)
    }
  }, [])

  return { status, message, onSubmit, isLoading: status === 'loading' }
}
