import generate from './generate'

const html = generate(
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

const data = generate(
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

const pdf = generate(
  {
    data: {
      pdf: true,
      meta: false
    }
  },
  `pdf: true,
    meta: false`
)

const screenshot = generate(
  {
    data: {
      screenshot: true,
      meta: false
    }
  },
  `screenshot: true,
    meta: false`
)

const stats = generate(
  {
    data: {
      stats: true,
      meta: false
    }
  },
  `stats: true,
    meta: false`
)

export const tabs = { data, html, pdf, screenshot, stats }

export default tab => tabs[tab]
