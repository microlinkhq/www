exports.onClientEntry = () => {
  window.process = { cwd: () => '/' }
}

// Override gatsby-plugin-styled-components' wrapRootElement to prevent
// double initialization with styled-components 6.3.x which handles
// client-side style injection automatically
exports.wrapRootElement = ({ element }) => element
