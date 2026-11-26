const { navigate } = require('gatsby')
const { recordAttribution } = require('./src/helpers/attribution')
const { registerWebMcpTools } = require('./src/helpers/webmcp')
const { clearStoredApiKey } = require('./src/helpers/clear-stored-api-key')

exports.onClientEntry = () => {
  window.process = { cwd: () => '/' }
  clearStoredApiKey(window)
  recordAttribution()
  registerWebMcpTools({
    document,
    navigator,
    fetch: (...args) => window.fetch(...args),
    navigate
  })
}

exports.onRouteUpdate = ({ location, prevLocation }) => {
  if (prevLocation && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search + location.hash
    })
  }
}
