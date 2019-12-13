exports.onInitialClientRender = () => {
  window.VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    glare: true,
    max: 10,
    startX: -10,
    startY: 6.7,
    'full-page-listening': true,
    'max-glare': 0.1
  })
}
