import { SEARCH_EXAMPLE } from 'components/pages/home/catalog'
import heroDemoRequests from 'components/pages/home/hero-demo-requests'
import { isRateLimited } from 'helpers/api-error'
import { useCallback } from 'react'
import mql from '@microlink/mql'

import { fetchDemoSnapshot, loadingReq, snapshotReq } from './requests'

const { REQUEST_OPTS, SNAPSHOT_URLS } = heroDemoRequests

export const useRunRequest = ({ reqId, setReq }) =>
  useCallback(
    async snapshot => {
      if (snapshot.vertical === 'search') {
        reqId.current += 1
        setReq({
          status: 'success',
          D: snapshot,
          apiUrl: `https://pro.microlink.io/?url=${encodeURIComponent(
            snapshot.fullUrl
          )}`,
          body: {
            status: 'success',
            data: {
              query: SEARCH_EXAMPLE.query,
              results: SEARCH_EXAMPLE.payload
            },
            statusCode: 200
          },
          headerRows: [],
          bars: [],
          rows: [],
          totalMs: null,
          elapsedMs: 0
        })
        return
      }

      const opts = REQUEST_OPTS[snapshot.vertical] || {}
      const loading = loadingReq(snapshot)
      const { apiUrl } = loading
      const id = ++reqId.current

      if (snapshot.fullUrl === SNAPSHOT_URLS[snapshot.vertical]) {
        const cachedT0 = window.performance.now()
        const loadingTimer = window.setTimeout(() => {
          if (id === reqId.current) setReq(loading)
        }, 150)
        const cached = await fetchDemoSnapshot(snapshot.vertical)
        window.clearTimeout(loadingTimer)
        if (id !== reqId.current) return
        if (cached && cached.body && cached.apiUrl === apiUrl) {
          setReq(
            snapshotReq(
              snapshot,
              cached,
              Math.round(window.performance.now() - cachedT0) || undefined
            )
          )
          return
        }
      }

      setReq(loading)
      const t0 = window.performance.now()
      try {
        const { response, ...body } = await mql(snapshot.fullUrl, opts)
        if (id !== reqId.current) return
        const headers = response
          ? Object.fromEntries(response.headers.entries())
          : null
        setReq(
          snapshotReq(
            snapshot,
            { apiUrl, body, headers: headers || {} },
            Math.round(window.performance.now() - t0)
          )
        )
      } catch (err) {
        if (id !== reqId.current) return
        if (err && (isRateLimited(err.statusCode) || isRateLimited(err.code))) {
          setReq({ status: 'rate-limited', D: snapshot, apiUrl })
          return
        }
        setReq({
          status: 'error',
          D: snapshot,
          apiUrl,
          error: (err && err.message) || 'The request could not be completed.',
          elapsedMs: Math.round(window.performance.now() - t0)
        })
      }
    },
    [reqId, setReq]
  )
