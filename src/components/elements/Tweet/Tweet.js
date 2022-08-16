import { Tweet as TweetBase } from 'react-twitter-widgets'
import React from 'react'

const Tweet = props => (
  <TweetBase
    options={{
      align: 'center'
    }}
    {...props}
  />
)

export default Tweet
