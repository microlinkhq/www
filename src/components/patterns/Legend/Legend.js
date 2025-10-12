import React from 'react'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import SubheadBase from 'components/elements/Subhead'
import { withTitle } from 'helpers/hoc/with-title'
import { theme } from 'theme'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)

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
