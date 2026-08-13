import React from 'react'
import styled, { keyframes } from 'styled-components'
import { colors, theme } from 'theme'
import { rgba } from 'polished'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { FileType } from 'components/icons/FileType'
import { Microlink } from 'components/logos'
import { PRODUCTS } from 'components/pages/home/catalog'
import { DemoCard } from 'components/patterns/ProductStory/demo-card'

const INPUTS = [
  { name: 'document.pdf', type: 'pdf' },
  { name: 'guide.docx', type: 'docx' },
  { name: 'report.xlsx', type: 'xlsx' },
  { name: 'slides.pptx', type: 'pptx' }
]

const OUTPUTS = [
  {
    label: 'HTML',
    icon: PRODUCTS.html.icon,
    bg: colors.violet0,
    color: colors.violet7
  },
  {
    label: 'MARKDOWN',
    icon: PRODUCTS.markdown.icon,
    bg: colors.indigo0,
    color: colors.indigo7
  },
  {
    label: 'TEXT',
    icon: PRODUCTS.text.icon,
    bg: colors.orange0,
    color: colors.orange8
  },
  { label: 'PDF', icon: PRODUCTS.pdf.icon, bg: colors.red0, color: colors.red6 }
]

const CURVE_X = [55, 165, 275, 385]

const dashFlow = keyframes`
  to { stroke-dashoffset: -26; }
`

const Body = styled(Box)(theme({ px: 4, py: 5, bg: 'white' }))

const TileGrid = styled(Box)(
  theme({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: 2
  })
)

const FileTile = styled(Flex)(
  theme({
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    py: 3,
    px: 1,
    bg: 'white',
    border: 1,
    borderColor: 'gray2',
    borderRadius: 3
  })
)

const FileName = styled(Text)(
  theme({
    fontFamily: 'mono',
    fontSize: '10px',
    color: 'black60',
    maxWidth: '100%'
  }),
  'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'
)

const Bus = styled('svg')`
  display: block;
  width: 100%;
  height: 60px;

  path {
    fill: none;
    stroke: ${colors.gray4};
    stroke-width: 2;
    stroke-dasharray: 6 7;
    stroke-linecap: round;
    animation: ${dashFlow} 1.6s linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    path {
      animation: none;
    }
  }
`

const NodeWrap = styled(Flex)`
  position: relative;
  align-items: center;
  justify-content: center;
`

const NodeGlow = styled(Box)`
  position: absolute;
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${rgba(colors.pink6, 0.18)},
    ${rgba(colors.violet6, 0.14)} 42%,
    ${rgba(colors.white, 0)} 72%
  );
  filter: blur(8px);
`

const NodeCircle = styled(Flex)(
  theme({
    position: 'relative',
    width: '96px',
    height: '96px',
    borderRadius: '50%',
    bg: 'white',
    boxShadow: 0,
    alignItems: 'center',
    justifyContent: 'center'
  })
)

const OutTile = styled(Flex)(
  theme({
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    py: 3,
    borderRadius: 2,
    fontFamily: 'mono',
    fontSize: '10px',
    fontWeight: 'bold',
    letterSpacing: 1
  })
)

const FooterResult = styled(Text)`
  font-family: inherit;
  font-size: inherit;
  color: ${colors.black50};

  b {
    color: ${colors.orange8};
    font-weight: bold;
  }
`

const curvesIn = CURVE_X.map(x => `M${x} 0 C ${x} 40, 220 24, 220 60`)

const curvesOut = CURVE_X.map(x => `M220 0 C 220 22, ${x} 38, ${x} 60`)

export const ConversionCapabilitiesVisual = () => (
  <DemoCard
    maxWidth='620px'
    footer={
      <FooterResult as='span'>
        <b>✓ readable content</b> · structure preserved
      </FooterResult>
    }
  >
    <Body>
      <TileGrid>
        {INPUTS.map(({ name, type }) => (
          <FileTile key={name}>
            <FileType type={type} size={40} />
            <FileName as='span'>{name}</FileName>
          </FileTile>
        ))}
      </TileGrid>
      <Bus viewBox='0 0 440 60' preserveAspectRatio='none' aria-hidden='true'>
        {curvesIn.map(d => (
          <path key={d} d={d} />
        ))}
      </Bus>
      <NodeWrap>
        <NodeGlow />
        <NodeCircle>
          <img
            src={Microlink.logoUri}
            alt=''
            css={{ width: '42px', height: 'auto', display: 'block' }}
          />
        </NodeCircle>
      </NodeWrap>
      <Bus viewBox='0 0 440 60' preserveAspectRatio='none' aria-hidden='true'>
        {curvesOut.map(d => (
          <path key={d} d={d} />
        ))}
      </Bus>
      <TileGrid>
        {OUTPUTS.map(({ label, icon: Icon, bg, color }) => (
          <OutTile key={label} css={{ background: bg, color }}>
            {label}
            <Icon width='20px' height='20px' />
          </OutTile>
        ))}
      </TileGrid>
    </Body>
  </DemoCard>
)
