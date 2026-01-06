import React, { lazy, Suspense } from 'react'

// Lazy load react-twitter-widgets to reduce initial bundle
const TweetBase = lazy(() =>
  import('react-twitter-widgets').then(module => ({ default: module.Tweet }))
)

export const Tweet = props => (
  <Suspense fallback={<div style={{ minHeight: '500px' }} />}>
    <TweetBase
      options={{
        align: 'center'
      }}
      {...props}
    />
  </Suspense>
)
