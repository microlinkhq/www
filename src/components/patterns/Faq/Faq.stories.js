import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'

import { Text } from 'components/elements'
import { Faq } from 'components/patterns'

storiesOf('Patterns', module).add('Faq', () => (
  <>
    <Story name='Faq' width='100%'>
      <Faq
        title='Product Information'
        caption='All you need to know.'
        questions={[
          {
            question: 'How does it work?',
            answer: (
              <>
                <div>
                  <Text as='span' fontWeight='bold' color='black'>
                    Microlink for Screenshot
                  </Text>{' '}
                  takes any URL as an input and returns a screenshot back,
                  hosted at Microlink CDN.
                </div>
                <div>
                  It supports most of the common browser interactions, like
                  clicks, wait for events, handle the scroll... but also some
                  extra things, like markup injection or overlay composition,
                  making it a more complete tool.
                </div>
              </>
            )
          }
        ]}
      />
    </Story>
  </>
))
