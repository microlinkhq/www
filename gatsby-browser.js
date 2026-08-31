exports.onClientEntry = () => {
  window.process = { cwd: () => '/' }
}

exports.onRouteUpdate = ({ location, prevLocation }) => {
  if (prevLocation && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search + location.hash
    })
  }
}
