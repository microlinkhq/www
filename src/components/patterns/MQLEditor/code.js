import { mqlCode } from 'helpers'

import * as data from './data'

export const meta = mqlCode(data.meta.url, {
  data: {
    audio: true,
    video: true,
    meta: true
  }
})

export const iframe = mqlCode(data.iframe.url, {
  data: {
    iframe: {
      maxWidth: 350
    }
  }
})

export const pdf = mqlCode(data.pdf.url, {
  pdf: {
    format: 'A4',
    margin: '0.35cm',
    scale: 0.6
  },
  meta: false
})

export const screenshot = mqlCode(data.screenshot.url, {
  screenshot: {
    overlay: {
      browser: 'dark'
    }
  }
})

export const insights = mqlCode(data.insights.url, {
  insights: {
    lighthouse: true
  }
})
