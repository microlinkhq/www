import { breakpoints, layout, theme, shadows } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import { Caption } from 'components/patterns/CustomerStory/primitives'

export const Eyebrow = styled(Text)`
  ${theme({
    color: 'secondary',
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    letterSpacing: '0.12em',
    textTransform: 'uppercase'
  })}
`

export const BodyText = props => (
  <Caption
    forwardedAs='p'
    titleize={false}
    {...props}
    css={[
      theme({
        textAlign: 'left',
        maxWidth: layout.large,
        mx: 0,
        color: 'black'
      }),
      props.css
    ]}
  />
)

export const PlanTag = styled(Box)`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    bg: 'pinkest',
    color: 'secondary',
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    letterSpacing: '0.08em',
    px: '10px',
    py: '4px',
    borderRadius: '20px',
    textTransform: 'uppercase'
  })}
`

/* ─── Flow diagram pieces ────────────────────────────────────────────────── */

export const Node = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    px: [3, 3, 3, 3],
    py: [3, 3, 3, 3],
    width: ['100%', '100%', 'auto', 'auto'],
    minWidth: [0, 0, '0', '0'],
    flex: ['0 0 auto', '0 0 auto', '1 1 0', '1 1 0']
  })}
  box-shadow: ${shadows[1]};
  text-align: center;
`

export const NodeActive = styled(Node)`
  ${theme({
    bg: 'pinkest',
    borderColor: 'secondary'
  })}
`

export const NodeLabel = styled(Text)`
  ${theme({
    fontSize: 0,
    fontFamily: 'mono',
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  })}
`

export const NodeSub = styled(Text)`
  ${theme({
    fontSize: 0,
    color: 'black60',
    pt: 1
  })}
`

export const Arrow = () => (
  <Flex
    aria-hidden='true'
    css={`
      ${theme({
        color: 'black30',
        flex: '0 0 auto',
        alignItems: 'center',
        justifyContent: 'center'
      })}
      @media (max-width: calc(${breakpoints[1]} - 1px)) {
        transform: rotate(90deg);
      }
    `}
  >
    <svg
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='9 18 15 12 9 6' />
    </svg>
  </Flex>
)

export const ScenarioHeader = ({ title, status }) => (
  <Flex
    css={theme({
      alignItems: 'baseline',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 2,
      pb: [2, 2, 3, 3]
    })}
  >
    <Text
      as='span'
      css={theme({
        fontFamily: 'mono',
        fontSize: 1,
        fontWeight: 'bold',
        color: 'black',
        letterSpacing: '0.04em'
      })}
    >
      {title}
    </Text>
    <Box
      css={theme({
        bg: 'white',
        color: 'black70',
        border: 1,
        borderColor: 'black10',
        borderRadius: 5,
        fontFamily: 'mono',
        fontSize: 0,
        fontWeight: 'bold',
        px: 2,
        py: 1,
        letterSpacing: '0.04em',
        textTransform: 'uppercase'
      })}
    >
      {status}
    </Box>
  </Flex>
)

export const ScenarioRow = ({ children }) => (
  <Flex
    css={theme({
      alignItems: 'stretch',
      gap: [2, 2, 3, 3],
      flexDirection: ['column', 'column', 'row', 'row']
    })}
  >
    {children}
  </Flex>
)

/* ─── Cards ──────────────────────────────────────────────────────────────── */

const RuleChip = styled(Text).attrs({ as: 'span' })`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    bg: 'white',
    color: 'black',
    border: 1,
    borderColor: 'black10',
    borderRadius: 2,
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    px: 2,
    py: 1
  })}
`

export const Card = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    width: '100%',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: [3, 3, 4, 4],
    alignItems: 'stretch'
  })}
  box-shadow: ${shadows[1]};
`

export const CardSide = styled(Box)`
  ${theme({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  })}
`

export const CardMain = styled(Box)`
  ${theme({
    width: '100%',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  })}
`

export const CardTitle = styled(Text)`
  ${theme({
    fontSize: 2,
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 1
  })}
`

export const CardKicker = styled(Text)`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    color: 'secondary',
    letterSpacing: '0.08em',
    textTransform: 'uppercase'
  })}
`

export const CardBody = styled(Text)`
  ${theme({
    fontSize: [1, 1, 1, 1],
    lineHeight: 2,
    color: 'black70'
  })}
`

export const ChipRow = ({ items }) => (
  <Flex css={theme({ flexWrap: 'wrap', gap: 2, py: 3 })}>
    {items.map(item => {
      const label = typeof item === 'string' ? item : item.label
      const href = typeof item === 'string' ? undefined : item.href

      if (!href) {
        return <RuleChip key={label}>{label}</RuleChip>
      }

      return (
        <Link
          key={label}
          href={href}
          css={theme({ textDecoration: 'none', color: 'inherit' })}
        >
          <RuleChip>{label}</RuleChip>
        </Link>
      )
    })}
  </Flex>
)
