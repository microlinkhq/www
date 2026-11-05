const { navigate } = require('gatsby')
const { recordAttribution } = require('./src/helpers/attribution')
const { registerWebMcpTools } = require('./src/helpers/webmcp')

exports.onClientEntry = () => {
  window.process = { cwd: () => '/' }
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
