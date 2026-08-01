import React from 'react'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { useOssTotalStars } from 'components/hook/use-oss-total-stars'
import ArrowLink from 'components/patterns/ArrowLink'
import { colors, layout, theme } from 'theme'

const COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1
})

const formatCompact = n => COMPACT_NUMBER_FORMATTER.format(n).toLowerCase()

const Dot = () => (
  <Text
    as='span'
    aria-hidden='true'
    css={theme({ color: 'black30', px: [2, 2, 3, 3], display: 'inline-block' })}
  >
    ·
  </Text>
)

const Stat = ({ value, children }) => (
  <Text as='span'>
    <Text as='span' css={theme({ color: 'black' })}>
      {value}
    </Text>{' '}
    {children}
  </Text>
)

const PlansFooter = ({ footer }) => {
  const totalStars = useOssTotalStars()

  return (
    <>
      <Box
        aria-hidden='true'
        css={`
          margin-top: 32px;
          width: 100%;
          max-width: ${layout.normal};
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            ${colors.black10},
            transparent
          );
        `}
      />

      {footer === 'stats' && (
        <Flex
          css={theme({
            pt: [3, 3, 4, 4],
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: [0, 0, 1, 1],
            color: 'black70',
            fontWeight: 'bold',
            letterSpacing: 1
          })}
        >
          <Stat value={formatCompact(totalStars)}>GitHub stars</Stat>
          <Dot />
          <Stat value='641M+'>requests last month</Stat>
          <Dot />
          <Stat value='99.9%'>SLA</Stat>
        </Flex>
      )}

      {footer === 'compare' && (
        <Flex
          css={theme({
            pt: [3, 3, 4, 4],
            flexDirection: ['column', 'row', 'row', 'row'],
            alignItems: 'center',
            justifyContent: 'center',
            gap: [1, 2, 2, 2],
            textAlign: 'center',
            fontSize: [1, 1, 2, 2]
          })}
        >
          <Text as='span' css={theme({ color: 'black70' })}>
            Need more details?
          </Text>
          <ArrowLink href='/pricing'>Compare every plan side by side</ArrowLink>
        </Flex>
      )}
    </>
  )
}

export default PlansFooter
