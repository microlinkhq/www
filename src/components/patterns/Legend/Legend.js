import React from 'react'
import { Caps, Flex, Heading, Subhead } from 'components/elements'
import { theme } from 'theme'

const Legend = ({ title, sup, textAlign = 'center', children }) => (
  <Flex
    as='header'
    css={theme({
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    })}
  >
    <Subhead
      css={theme({
        fontSize: 2,
        fontWeight: 'bold',
        color: 'secondary',
        textAlign
      })}
    >
      <Caps
        as='span'
        css={theme({
          letterSpacing: 3
        })}
      >
        {sup}
      </Caps>
    </Subhead>
    <Heading
      variant={null}
      css={theme({
        mt: 1,
        mb: children && 1,
        fontWeight: 'bold',
        fontSize: [3, 5],
        textAlign
      })}
    >
      {title}
    </Heading>
    {children}
  </Flex>
)

export default Legend
