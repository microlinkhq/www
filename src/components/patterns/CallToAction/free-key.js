import React from 'react'
import { theme } from 'theme'
import Text from 'components/elements/Text'
import { FREE_PLAN_REQUESTS_PER_DAY } from 'helpers/free-tier'

export const ACTION_LABEL = 'Get your free API key'

export const FREE_KEY_FACTS = [
  `${FREE_PLAN_REQUESTS_PER_DAY} requests/day`,
  'Every Pro feature',
  'No credit card'
]

export const Facts = ({ facts }) => (
  <Text
    css={theme({
      pt: 3,
      fontSize: 0,
      color: 'black60',
      textWrap: 'balance'
    })}
  >
    {facts.map((fact, index) => (
      <React.Fragment key={fact}>
        {index > 0 && ' · '}
        <Text
          as='span'
          css={theme({ fontSize: 'inherit', whiteSpace: 'nowrap' })}
        >
          {fact}
        </Text>
      </React.Fragment>
    ))}
  </Text>
)
