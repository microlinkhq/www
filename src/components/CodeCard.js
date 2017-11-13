import React, {Component} from 'react'
import {hoc, Truncate, Avatar, Box, monospace, Card, Flex, BackgroundImage} from 'rebass'
import styled, { keyframes } from 'styled-components'
import { LiveProvider, LiveEditor } from 'react-live'
import { responsiveStyle, width } from 'styled-system'
import colorMeasure from 'color-measure'
import Tilt from 'react-tilt'
import fetch from 'unfetch'
import color from 'color'

import Container from './Container'
import {colors} from '../theme'

const REGEX_URL_WITHOUT_PROTOCOL = /(^\w+:|^)\/\//
const PALETTE_FALLBACK = [colors.gray2, colors.gray3, colors.gray4]

const urlWithoutProtocol = url => url.replace(REGEX_URL_WITHOUT_PROTOCOL, '')

const getImageUrl = url => (
  typeof url === 'string'
    ? `https://images.weserv.nl/?url=${urlWithoutProtocol(url)}&w=500`
    : ''
)

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

const maxHeight = responsiveStyle({
  prop: 'height',
  cssProperty: 'maxHeight'
})

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
overflow: auto;
${maxHeight}
`

const PreviewCard = ({children, size, ...props}) => (
  <CustomCard
    width={size}
    height={size.map(n => `${n / 2}px`)} {...props}
    left={0}>
    {children}
  </CustomCard>
)

const CustomTilt = styled(Tilt)`
transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1);

&::after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  transform: scale(1);
  filter: blur(25px);
  background: linear-gradient(270deg, ${props => props.colors.join(', ')});
  background-size: 200% 200%;
  animation: ${animateGlow} ${props => props.duration} ease infinite;
}
`

const CardHeader = Box.extend`
  position: absolute;
  bottom: 0;
  margin: 0;
  box-shadow: 0 5px 30px 10px rgba(0, 0, 0, 0.3);
`

const CardHeaderLogo = Avatar.extend`
  ${width}
  height: 100%;
`

const CardHeaderBody = Box.extend`
  max-width: 85%;
`

export default class extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.fetchUrl = this.fetchUrl.bind(this)

    this.state = {
      data: {
        author: null,
        date: null,
        description: 'Converse has spent a good part of this year updating some of their classics. Our past is constantly catching up to us, but we rarely get to see the relationship…',
        favicon: {
          width: 180,
          height: 180,
          type: 'png',
          url: 'https://i.vimeocdn.com/favicon/main-touch_180',
          palette: [
            '#04acec',
            '#94dcfb',
            '#025f82'
          ],
          background_color: '#94DCFB',
          color: '#025E81',
          alternative_color: '#025F82'
        },
        image: {
          width: 1280,
          height: 720,
          type: 'jpg',
          url: 'https://i.vimeocdn.com/video/598160082_1280x720.jpg',
          palette: [
            '#564748',
            '#21a8f4',
            '#dabcbd',
            '#9ccded',
            '#5d7c9b',
            '#044cad'
          ],
          background_color: '#564748',
          color: '#77CAF8',
          alternative_color: '#C8DFFE'
        },
        logo: null,
        publisher: 'Vimeo',
        title: 'Converse - Past meets Present - Montage',
        url: 'https://vimeo.com/188175573'
      }
    }
  }

  onChange (newState) {
    try {
      const {data} = JSON.parse(newState)
      this.setState({data})
    } catch (err) {}
  }

  fetchUrl (url) {
    fetch(url)
      .then(res => res.json())
      .then(({data}) => {
        data && this.setState({url, data})
        this.props.loaderStop()
      })
  }

  componentDidMount () {
    this.fetchUrl(this.props.url)
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.url !== nextState.url) this.fetchUrl(nextProps.url)
  }

  render () {
    const {url, loaderStop, ...props} = this.props
    const {publisher, description} = this.state.data
    const favicon = this.state.data.favicon || {}
    const image = this.state.data.image || {}
    const palette = [].concat(image.palette).filter(c => colorMeasure.isLight(color(c)))
    const logo = favicon.url || favicon || image.url || image

    return (
      <Container is='section' {...props}>
        <Provider
          mountStylesheet={false}
          code={JSON.stringify(this.state, null, 2)}>
          <Row justify='space-around' direction='row' align='center' wrap>
            <PreviewCard
              style={{boxShadow: `${colors.gray2} 0 32px 64px 0`}}
              size={[350, 500]}
              my={3}>
              <Editor width={[ 1, 1, 1 / 2 ]} onChange={this.onChange} />
            </PreviewCard>

            <CustomTilt
              className='tilt'
              options={{ max: 8, scale: 1.02 }}
              colors={palette.length > 1 ? palette : PALETTE_FALLBACK}
              duration={'5s'}
            >
              <PreviewCard size={[350, 500]} my={3}>
                <BackgroundImage
                  ratio={1 / 2}
                  src={getImageUrl(image.url)}
                  style={{position: 'relative'}}
                  >
                  <CardHeader p={[2, 3]} width='100%'
                    style={{background: '#f7f8fa'}}>
                    <Flex align='flex-start'>
                      <CardHeaderLogo width={['32px', '48px']} src={getImageUrl(logo)} />
                      <CardHeaderBody ml={2}>
                        <Truncate>{publisher}</Truncate>
                        <Truncate>{description}</Truncate>
                      </CardHeaderBody>
                    </Flex>
                  </CardHeader>
                </BackgroundImage>
              </PreviewCard>
            </CustomTilt>
          </Row>
        </Provider>
      </Container>
    )
  }
}
