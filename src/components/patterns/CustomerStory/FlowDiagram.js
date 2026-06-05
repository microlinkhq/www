import { breakpoints, colors, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import { Figure } from './primitives'

const Node = styled(Box)`
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
  box-shadow: 0 1px 2px ${colors.black05};
  text-align: center;
`

const NodeLabel = styled(Text)`
  ${theme({
    fontSize: 0,
    fontFamily: 'mono',
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  })}
`

const NodeSub = styled(Text)`
  ${theme({
    fontSize: 0,
    color: 'black60',
    pt: 1
  })}
`

const ArrowWrapper = styled(Flex)`
  ${theme({
    color: 'black30',
    flex: '0 0 auto',
    alignItems: 'center',
    justifyContent: 'center'
  })}

  @media (max-width: calc(${breakpoints[1]} - 1px)) {
    transform: rotate(90deg);
  }
`

const Arrow = () => (
  <ArrowWrapper aria-hidden='true'>
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
  </ArrowWrapper>
)

export const FlowDiagram = ({ accent, nodes }) => (
  <Figure>
    <Flex
      css={theme({
        alignItems: 'stretch',
        gap: [2, 2, 3, 3],
        flexDirection: ['column', 'column', 'row', 'row']
      })}
    >
      {nodes.map((node, i) => (
        <React.Fragment key={node.label}>
          {i > 0 && <Arrow />}
          <Node
            css={
              node.active
                ? theme({ bg: accent.bgSoft, borderColor: accent.text })
                : undefined
            }
          >
            <NodeLabel>{node.label}</NodeLabel>
            {node.sub && <NodeSub>{node.sub}</NodeSub>}
          </Node>
        </React.Fragment>
      ))}
    </Flex>
  </Figure>
)
