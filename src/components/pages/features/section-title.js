import { theme } from 'theme'
import React from 'react'

import Text from 'components/elements/Text'

export const SECTION_TITLE_FONT_SIZE = [2, 2, 3, 3]

export const SectionTitle = ({ children, ...props }) => (
  <Text
    as='h2'
    css={theme({
      fontFamily: 'sans',
      fontWeight: 'bold',
      fontSize: SECTION_TITLE_FONT_SIZE,
      letterSpacing: 1,
      lineHeight: 0,
      textAlign: 'left',
      textWrap: 'balance',
      overflowWrap: 'break-word',
      color: 'black',
      m: 0,
      pb: [3, 3, 4, 4]
    })}
    {...props}
  >
    {children}
  </Text>
)
