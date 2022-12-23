const quicklink = require('quicklink')

exports.onClientEntry = () => {
  window.addEventListener('load', () => quicklink.listen({ throttle: 2 }))
  window.$crisp = []
  window.CRISP_WEBSITE_ID = '1ad5d211-8699-43f6-add3-578b9e47b922'
  window.process = {
    cwd: () => '/'
  }
}
