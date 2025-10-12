import { storiesOf } from '@storybook/react'
import React, { useState } from 'react'
import { Story } from 'story'
import { theme } from 'theme'

import Button from '../Button/Button'
import Caps from '../Caps'
import Box from '../Box'
import Flex from '../Flex'
import Text from '../Text'
import Input from '../Input/Input'
import Tweet from './Tweet'

const storyName = 'Tweet'

const code = `
import Tweet from './Tweet'

export default () => (
  <Tweet tweetId='1252534757981696000' />
)`

// Sample tweet IDs for demonstration
const sampleTweets = [
  {
    id: '1252534757981696000',
    description: 'Microlink tweet about cards'
  },
  {
    id: '1316770505148243968',
    description: 'Twitter announcement'
  },
  {
    id: '1445078208190291973',
    description: 'Tech tweet example'
  }
]

const TweetStory = () => {
  const [currentTweetId, setCurrentTweetId] = useState(sampleTweets[0].id)
  const [customTweetId, setCustomTweetId] = useState('')

  const loadTweet = tweetId => {
    setCurrentTweetId(tweetId)
  }

  const loadCustomTweet = () => {
    if (customTweetId.trim()) {
      // Extract tweet ID from URL if full URL is provided
      const tweetIdMatch = customTweetId.match(/status\/(\d+)/)
      const tweetId = tweetIdMatch ? tweetIdMatch[1] : customTweetId.trim()
      setCurrentTweetId(tweetId)
      setCustomTweetId('')
    }
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      loadCustomTweet()
    }
  }

  return (
    <Story name={storyName} code={code}>
      <Box css={theme({ maxWidth: '600px', mx: 'auto' })}>
        <Text css={theme({ textAlign: 'center', mb: 4 })}>
          Embed Twitter tweets using their tweet ID or URL
        </Text>

        {/* Sample tweets */}
        <Box css={theme({ mb: 4 })}>
          <Text css={theme({ fontSize: 1, fontWeight: 'bold', mb: 2 })}>
            Sample Tweets:
          </Text>
          <Flex css={theme({ flexDirection: 'column', gap: 2 })}>
            {sampleTweets.map(tweet => (
              <Button
                key={tweet.id}
                variant={currentTweetId === tweet.id ? 'primary' : 'outline'}
                onClick={() => loadTweet(tweet.id)}
                css={theme({ justifyContent: 'flex-start' })}
              >
                <Caps css={theme({ fontSize: 0 })}>{tweet.description}</Caps>
              </Button>
            ))}
          </Flex>
        </Box>

        {/* Custom tweet input */}
        <Box css={theme({ mb: 4 })}>
          <Text css={theme({ fontSize: 1, fontWeight: 'bold', mb: 2 })}>
            Load Custom Tweet:
          </Text>
          <Flex css={theme({ gap: 2 })}>
            <Input
              placeholder='Enter tweet ID or URL'
              value={customTweetId}
              onChange={event => setCustomTweetId(event.target.value)}
              onKeyPress={handleKeyPress}
              css={theme({ flex: 1 })}
            />
            <Button onClick={loadCustomTweet} disabled={!customTweetId.trim()}>
              <Caps css={theme({ fontSize: 0 })}>Load</Caps>
            </Button>
          </Flex>
          <Text css={theme({ fontSize: 0, color: 'black60', mt: 1 })}>
            Example: 1252534757981696000 or
            https://twitter.com/user/status/1252534757981696000
          </Text>
        </Box>

        {/* Current tweet display */}
        <Box css={theme({ mb: 2 })}>
          <Text css={theme({ fontSize: 1, fontWeight: 'bold', mb: 2 })}>
            Current Tweet (ID: {currentTweetId}):
          </Text>
        </Box>

        {/* Tweet component */}
        <Box
          css={theme({
            border: '1px solid',
            borderColor: 'black10',
            borderRadius: 2,
            p: 3,
            bg: 'white'
          })}
        >
          <Tweet tweetId={currentTweetId} />
        </Box>
      </Box>
    </Story>
  )
}

storiesOf('Elements', module).add(storyName, () => <TweetStory />)
