module.exports = opts =>
  window.ga &&
  window.ga('send', 'event', {
    transport: 'beacon',
    ...opts
  })
