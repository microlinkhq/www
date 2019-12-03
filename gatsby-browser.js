exports.onInitialClientRender = () => {
  window.VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    glare: true,
    reverse: true,
    max: 15,
    'max-glare': 0.1
  })
}
