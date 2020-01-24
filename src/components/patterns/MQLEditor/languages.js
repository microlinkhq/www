import { mqlCode } from 'helpers'

const html = mqlCode(
  {
    data: {
      html: {
        selector: 'html'
      }
    }
  },
  `data: {
      html: {
        selector: 'html'
      }
    }`
)

const data = mqlCode(
  {
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

const pdf = mqlCode(
  {
    data: {
      pdf: true,
      meta: false
    }
  },
  `pdf: true,
    meta: false`
)

const screenshot = mqlCode(
  {
    data: {
      screenshot: true,
      meta: false
    }
  },
  `screenshot: true,
    meta: false`
)

const insights = mqlCode(
  {
    data: {
      insights: true,
      meta: false
    }
  },
  `insights: true,
    meta: false`
)

export const tabs = { data, html, pdf, screenshot, insights }

export default tab => tabs[tab]
