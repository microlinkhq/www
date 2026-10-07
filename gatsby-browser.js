const { recordAttribution } = require('./src/helpers/attribution')

exports.onClientEntry = () => {
  window.process = { cwd: () => '/' }
  recordAttribution()
}

exports.onRouteUpdate = ({ location, prevLocation }) => {
  if (prevLocation && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search + location.hash
    })
  }
}
