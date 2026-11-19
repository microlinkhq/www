import React from 'react'
import { theme } from 'theme'

import Flex from 'components/elements/Flex'
import { Button } from 'components/elements/Button/Button'
import ArrowLink from 'components/patterns/ArrowLink'
import { SignupLink } from 'components/patterns/SignupLink'

export const AlternativeHeroActions = ({
  cta,
  ctaLabel = 'Get your free API key',
  secondaryHref,
  secondaryLabel,
  onClick
}) => (
  <Flex
    css={theme({
      pt: [3, 3, 4, 4],
      width: '100%',
      columnGap: [3, 3, 4, 4],
      rowGap: 3,
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center'
    })}
  >
    <SignupLink component={Button} as='a' cta={cta} onClick={onClick}>
      {ctaLabel}
    </SignupLink>
    {secondaryHref && (
      <ArrowLink
        href={secondaryHref}
        css={theme({ fontSize: [1, 1, 2, 2], whiteSpace: 'nowrap' })}
      >
        {secondaryLabel}
      </ArrowLink>
    )}
  </Flex>
)
