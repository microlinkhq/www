import React, { Component } from 'react'
import { CodeEditor, Card, Flex } from 'components/elements'
import { aspectRatio } from 'helpers'
import styled from 'styled-components'

const CODE = {
  mql: `
import mql from '@microlink/mql'

await mql('https://twitter.com/microlinkhq', {
 rules: {
  stats: {
   selector: '.user > .profile',
    attr: {
     tweets: {
      selector: '.tweets',
      attr: 'data-count'
     },
     followings: {
      selector: '.following',
      attr: 'data-count'
     },
     favorites: {
      selector: '.favorites',
      attr: 'data-count'
     }
    }
   }
  }
})
`,
  api: `{
  "lang": "en",
  "author": "microlinkhq",
  "title": "microlink.io (@microlinkhq) | Twitter",
  "publisher": "Twitter",
  "image": {
    "url": "https://pbs.twimg.com/profile_banners/912255209988136960/1535042358/1500x500",
    "width": 1500,
    "height": 500,
    "type": "jpg",
    "size": 10644,
    "size_pretty": "10.6 kB"
  },
  "description": "The latest Tweets from microlink.io (@microlinkhq). Enter a URL, receive information. Get relevant information from any link & easily create beautiful previews. Say to hello@microlink.io",
  "date": "2017-09-01T00:00:00.000Z",
  "logo": {
    "url": "https://abs.twimg.com/icons/apple-touch-icon-192x192.png",
    "width": 192,
    "height": 192,
    "type": "png",
    "size": 2113,
    "size_pretty": "2.11 kB"
  },
  "url": "https://twitter.com/microlinkhq",
  "stats": {
    "favorites": "3",
    "followings": "406",
    "tweets": "58"
  }
}`
}

const { width, height } = aspectRatio([0.58, 0.58, 0.58, 0.58])

export default class extends Component {
  state = { view: 'mql' }

  render () {
    const { view } = this.state
    const language = view === 'mql' ? 'js' : 'json'

    return (
      <Flex
        mt={3}
        flexDirection='column'
        justifyContent='space-around'
        data-tilt-startX='-10'
        data-tilt-startY='6.7'
        data-tilt
      >
        <Flex flexDirection='column' mb={[4, 0]}>
          <Card width={width} height={height} style={{ overflow: 'auto' }}>
            <CodeEditor language={language}>{CODE[view]}</CodeEditor>
          </Card>
          <Flex justifyContent='flex-end'>
            <Card.Option
              children='mql'
              value={view}
              onClick={() => this.setState({ view: 'mql' })}
            />
            <Card.Option
              children='api'
              value={view}
              onClick={() => this.setState({ view: 'api' })}
            />
          </Flex>
        </Flex>
      </Flex>
    )
  }
}
