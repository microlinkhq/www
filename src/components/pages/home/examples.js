import Box from 'components/elements/Box'
import Subhead from 'components/elements/Subhead'
import { Link } from 'components/elements/Link'
import Caption from 'components/patterns/Caption/Caption'
import ExamplesSwitcher from 'components/patterns/ExamplesSwitcher'
import { HOME_CONTENT_WIDTH } from 'components/pages/home/catalog'
import { PANELS } from 'components/pages/home/examples-panels'
import { layout, theme, SECTION_VERTICAL_SPACING } from 'theme'
import React from 'react'

const Examples = () => (
  <Box
    as='section'
    id='examples'
    aria-labelledby='package-examples-title'
    css={theme({
      bg: 'white',
      color: 'black',
      py: SECTION_VERTICAL_SPACING
    })}
  >
    <Box
      css={theme({
        maxWidth: layout.large,
        mx: 'auto',
        textAlign: 'center',
        px: 3
      })}
    >
      <Subhead id='package-examples-title' variant='gradient'>
        One client. Every product.
      </Subhead>
      <Caption
        forwardedAs='p'
        css={theme({
          mx: 'auto',
          pt: [3, 3, 4, 4]
        })}
      >
        The <Link href='/integrations/sdk'>Microlink SDK</Link> gives you a
        consistent interface to everything Microlink offers.
      </Caption>
    </Box>

    <Box
      css={theme({
        maxWidth: HOME_CONTENT_WIDTH,
        mx: 'auto',
        mt: [4, 4, 5, 5],
        px: [3, 3, 4, 4]
      })}
    >
      <ExamplesSwitcher panels={PANELS} visibleTabs={5} />
    </Box>
  </Box>
)

export default Examples
