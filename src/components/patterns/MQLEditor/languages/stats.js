export default {
  'Node.js': () => `
import mql from '@microlink/mql'

const { data } = await mql('https://example.com', {
  stats: true
})
`
}
