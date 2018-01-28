import React, { Component } from 'react'
import {
  hoc,
  Truncate,
  Avatar,
  Box,
  monospace,
  Card,
  Flex,
  Banner
} from 'rebass'
import styled, { keyframes } from 'styled-components'
import { LiveProvider, LiveEditor } from 'react-live'
import { width } from 'styled-system'
import Tilt from 'react-tilt'
import color from 'color'

import Container from './Container'
import { colors, height } from '../theme'

const REGEX_URL_WITHOUT_PROTOCOL = /(^\w+:|^)\/\//
const PALETTE_FALLBACK = [ colors.gray2, colors.gray3, colors.gray4 ]
const urlWithoutProtocol = url => url.replace(REGEX_URL_WITHOUT_PROTOCOL, '')

const getImageUrl = url =>
  url.indexOf('https://') === 0
    ? url
    : `https://images.weserv.nl/?url=${urlWithoutProtocol(url)}`

const animateGlow = keyframes`
  0% {
    background-position:0% 50%;
  }

  50% {
    background-position:100% 50%;
  }
  100% {
    background-position:0% 50%;
  }
`

const codeColors = {
  black: '#24292e',
  gray: '#f6f8fa',
  gray2: '#eaecef',
  midgray: '#6a737d',
  red: '#d73a49',
  green: '#22863a',
  purple: '#6f42c1',
  blue: '#005cc5'
}

const Row = styled(Flex)`
  border-radius: 8px;
`

const Provider = styled(LiveProvider)`
  position: relative;
`

const Editor = styled(hoc()(LiveEditor))`
  width: 100%;
  max-height: inherit;
  box-sizing: border-box;
  font-family: ${monospace};
  font-size: 13px;
  margin: 0;
  padding: 16px;
  overflow: auto;
  outline: none;
  tab-size: 2;
  color: ${codeColors.black};
  background-color: ${codeColors.white};
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${codeColors.midgray};
  }
  .token.punctuation {
    color: ${codeColors.black};
  }
  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol {
    color: ${codeColors.green};
  }
  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: ${codeColors.purple};
  }
  // .token.operator,
  // .token.entity,
  // .token.url,
  // .language-css .token.string,
  // .style .token.string,
  // .token.variable {
  //   color: hsl(40, 90%, 60%);
  // }
  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: ${codeColors.red};
  }
  .token.regex,
  .token.important {
    color: ${codeColors.red};
  }
  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }
  .token.entity {
    cursor: help;
  }
  .token.deleted {
    color: red;
  }
`

const CustomCard = Card.extend`
  ${width}
  ${height}
  overflow: auto;
`

const PreviewCard = ({ children, ...props }) => (
  <CustomCard {...props}>
    {children}
  </CustomCard>
)

const CustomTilt = styled(Tilt)`
  ${width}
  transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1);

  &::after {
    position: absolute;
    content: "";
    top: 10%;
    left: 0;
    right: 0;
    z-index: -1;
    height: 85%;
    width: 100%;
    margin: 0 auto;
    transform: scale(1);
    filter: blur(18px);
    background: linear-gradient(270deg, ${props => props.colors.join(', ')});
    background-size: 200% 200%;
    animation: ${animateGlow} ${props => props.duration} ease infinite;
  }
`

const CardBackgroundImage = Banner.extend`
  ${height}
  min-height: auto;
  padding: 0;
`

const CardHeader = Box.extend`
  position: absolute;
  bottom: 0;
  margin: 0;
  box-shadow: 0 2px 3px 0 rgba(0,0,0,.075);
`

const CardHeaderLogo = Avatar.extend`
  ${width}
  height: 100%;
`

const CardHeaderBody = Box.extend`
  max-width: 85%;
`

const cardHeights = [ '175px', '200px', '', '235px', '275px' ]
const cardWidths = [ 1, '', 0.45 ]

export default class extends Component {
  render () {
    const { data, onChange, ...props } = this.props
    const { publisher, description } = data
    const logo = data.logo || {}
    const image = data.image || {}
    const palette = [].concat(image.palette).filter(c => color(c).isLight())

    return (
      <Container is='section' {...props}>
        <Provider mountStylesheet={false} code={JSON.stringify(data, null, 2)}>
          <Row
            justify='space-around'
            direction={[ 'column-reverse', '', 'row' ]}
            align='center'
            wrap
          >
            <PreviewCard
              style={{ boxShadow: `${colors.gray2} 0px 2px 54px 0px` }}
              width={cardWidths}
              height={cardHeights}
              my={3}
            >
              <Editor width={[ 1 ]} onChange={onChange} />
            </PreviewCard>
            <CustomTilt
              className='tilt'
              options={{ max: 8, scale: 1.02 }}
              colors={palette.length > 1 ? palette : PALETTE_FALLBACK}
              duration={'5s'}
              width={cardWidths}
            >
              <PreviewCard my={3} width={1} height={cardHeights}>
                <CardBackgroundImage
                  height='100%'
                  backgroundImage={getImageUrl(image.url || image)}
                  style={{ position: 'relative' }}
                >
                  <CardHeader
                    p={[ 2, 3 ]}
                    width='100%'
                    style={{ background: '#f7f8fa' }}
                  >
                    <Flex align='flex-start'>
                      <CardHeaderLogo
                        width={[ '32px', '48px' ]}
                        src={getImageUrl(logo.url || logo)}
                      />
                      <CardHeaderBody ml={2}>
                        <Truncate>{publisher}</Truncate>
                        <Truncate>{description}</Truncate>
                      </CardHeaderBody>
                    </Flex>
                  </CardHeader>
                </CardBackgroundImage>
              </PreviewCard>
            </CustomTilt>
          </Row>
        </Provider>
      </Container>
    )
  }
}
