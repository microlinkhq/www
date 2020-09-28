import { mqlCode } from 'helpers'

import * as data from './data'

export const meta = mqlCode(
  {
    url: data.meta.url,
    data: {
      audio: true,
      video: true,
      meta: true
    }
  },
  `audio: true,
    video: true,
    meta: true`
)

export const iframe = mqlCode(
  {
    url: data.iframe.url,
    data: {
      iframe: true
    }
  },
  `iframe: {
      maxWidth: 350
    }`
)

export const pdf = mqlCode(
  {
    url: data.pdf.url,
    data: {
      pdf: true,
      meta: false
    }
  },
  `pdf: {
      format: 'A4',
      margin: '0.35cm',
      scale: 0.6
    }`
)

export const screenshot = mqlCode(
  {
    url: data.screenshot.url,
    data: {
      screenshot: {
        overlay: {
          browser: 'dark'
        }
      }
    }
  },
  `screenshot: {
      overlay: {
        browser: 'dark'
      }
    }`
)

export const insights = mqlCode(
  {
    url: data.insights.url,
    data: {
      insights: {
        lighthouse: true
      }
    }
  },
  `insights: {
      lighthouse: true
    }`
)
