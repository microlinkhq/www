import scrollIntoView from 'scroll-into-view-if-needed'

export default id => event => {
  const node = document.getElementById(id)
  if (node) {
    event.preventDefault()
    scrollIntoView(node, {
      behavior: 'smooth',
      scrollMode: 'if-needed',
      block: 'nearest',
      inline: 'nearest'
    })

    window.history.pushState(null, null, `#${id}`)
  }
}
