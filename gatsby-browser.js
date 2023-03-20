exports.onClientEntry = () => {
  window.process = { cwd: () => '/' }
}
