import { Text, Box, CodeEditor } from 'components/elements'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import React from 'react'

const jsCode = `
const mql = require('@microlink/mql')

const github = (username) =>
  mql(\`https://github.com/\${username}\`, {
    data: {
      stats: {
        selector: '.user-profile-nav nav',
        attr: {
          repositories: {
            selector: 'a:nth-child(2) > span',
            type: 'number'
          },
          followers: {
            selector: 'a:nth-child(4) > span',
            type: 'number'
          },
          followings: {
            selector: 'a:nth-child(5) > span',
            type: 'number'
          }
        }
      }
    }
  })

const username = 'kikobeats'
const { response, data } = await github(username)

console.log(\`GitHub stats for @\${username}:\`, data.stats)
`

const bashCode = `
$ curl -i -I -X GET 'https://api.microlink.io/?url=https%3A%2F%2Fwww.reddit.com'

x-response-time : 21.518ms
x-fetch-mode    : fetch
x-fetch-time    : 618.055ms
`

const jsonCode = JSON.stringify(
  {
    title: 'Wormholes Explained – Breaking Spacetime',
    description:
      'To support Kurzgesagt and learn more about Brilliant, go to https://www.brilliant.org/nutshell and sign up for free. The first 688 people that go to that lin...',
    lang: 'en',
    author: 'Kurzgesagt – In a Nutshell',
    publisher: 'YouTube',
    image: {
      url: 'https://cdn.microlink.io/data/assets/youtube.com!watch!v=9P6rdqiybaw/img.youtube.com!vi!9P6rdqiybaw!maxresdefault.jpg.jpg',
      type: 'jpg',
      size: 120116,
      height: 720,
      width: 1280,
      size_pretty: '120 kB',
      palette: [
        '#C004F9',
        '#EEEEA7',
        '#25047C',
        '#740296',
        '#808018',
        '#2C0494'
      ],
      background_color: '#EEEEA7',
      color: '#AC04DF',
      alternative_color: '#2C0494'
    },
    audio: {
      url: 'https://cdn.microlink.io/data/assets/youtube.com!watch!v=9P6rdqiybaw/r3---sn-ab5sznly.googlevideo.com!videoplayback!c=WEB&clen=8935291&dur=552.054&ei=6gpAXv-3POHM8gTqtrm',
      type: 'mp4',
      duration: 552.054422,
      size: 8935291,
      duration_pretty: '9m',
      size_pretty: '8.94 MB'
    },
    url: 'https://www.youtube.com/watch?v=9P6rdqiybaw',
    iframe: {
      html: '<iframe width="480" height="270" src="https://www.youtube.com/embed/9P6rdqiybaw?feature=oembed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
      scripts: []
    },
    date: '2020-02-09T13:36:39.000Z',
    logo: {
      url: 'https://cdn.microlink.io/data/assets/youtube.com!watch!v=9P6rdqiybaw/logo.clearbit.com!youtube.com.png',
      type: 'png',
      size: 2421,
      height: 128,
      width: 128,
      size_pretty: '2.42 kB',
      palette: [
        '#FC0404',
        '#FC8484',
        '#830101',
        '#970101',
        '#950303',
        '#970101'
      ],
      background_color: '#FC0404',
      color: '#320000',
      alternative_color: '#320101'
    },
    video: {
      url: 'https://cdn.microlink.io/data/assets/youtube.com!watch!v=9P6rdqiybaw/r3---sn-ab5sznly.googlevideo.com!videoplayback!c=WEB&dur=552.054&ei=6gpAXv-3POHM8gTqtrmwBA&expire=15',
      type: 'mp4',
      duration: 552.007943,
      size: 54633895,
      height: 720,
      width: 1280,
      duration_pretty: '9m',
      size_pretty: '54.6 MB'
    }
  },
  null,
  2
)

storiesOf('Elements', module).add('CodeEditor', () => (
  <Story name='CodeEditor'>
    <Box mb={4}>
      <Text color='gray6' mb={2} fontSize={0}>
        {"<CodeEditor title='mql.js' language='js'>"}
      </Text>
      <CodeEditor className='language-js{10}' title='mql.js' language='js'>
        {jsCode}
      </CodeEditor>
    </Box>

    <Box mb={4}>
      <Text color='gray6' mb={2} fontSize={0}>
        {"<CodeEditor title='meta.json' language='json'>"}
      </Text>
      <CodeEditor title='meta.json' language='json'>
        {jsonCode}
      </CodeEditor>
    </Box>

    <Box mb={4}>
      <Text color='gray6' mb={2} fontSize={0}>
        {"<CodeEditor title='mql.js' language='js' theme='dark'>"}
      </Text>
      <CodeEditor
        className='language-sh{1}'
        title='mql.sh'
        language='bash'
        theme='dark'
      >
        {bashCode}
      </CodeEditor>
    </Box>
  </Story>
))
