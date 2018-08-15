const React = ({ url }) =>
  `
  import MicrolinkCard from 'react-microlink'

  <MicrolinkCard
    size='large'
    url='${url}'
    size='large'
    video
  />
`.trim()

const cURL = ({ url }) =>
  `
  $ curl "https://api.microlink.io?url=${url}&video"
`.trim()

export default {
  React,
  cURL
}
