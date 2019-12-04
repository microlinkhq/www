export default {
  'Node.js': () => `
import mql from '@microlink/mql'

const { data } = await mql('https://example.com', {
  screenshot: true
})
`
}
