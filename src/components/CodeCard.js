import React, {Component} from 'react'

import {hoc, Truncate, Avatar, Box, monospace, Card, Flex, BackgroundImage} from 'rebass'
import { responsiveStyle } from 'styled-system'
import styled from 'styled-components'
import Tilt from 'react-tilt'
import fetch from 'unfetch'
import { LiveProvider, LiveEditor } from 'react-live'

import Container from './Container'

const DEBOUNCE_MS = 700

const cardHeight = responsiveStyle({
  prop: 'height',
  cssProperty: 'maxHeight'
})

const colors = {
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
  color: ${colors.black};
  background-color: ${colors.white};
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${colors.midgray};
  }
  .token.punctuation {
    color: ${colors.black};
  }
  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol {
    // color: hsl(350, 40%, 70%);
    color: ${colors.green};
    // color: ${colors.black};
  }
  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: ${colors.purple};
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
    color: ${colors.red};
  }
  .token.regex,
  .token.important {
    color: ${colors.red};
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
${cardHeight}
`

const PreviewCard = ({children, size, ...props}) => (
  <CustomCard width={size} height={size.map(n => `${n / 2}px`)} {...props}>
    {children}
  </CustomCard>
)

const CardHeader = Box.extend`
  position: absolute;
  bottom: 0;
  margin: 0;
  box-shadow: 0 5px 30px 10px rgba(0, 0, 0, 0.3);
`

const CardHeaderLogo = Avatar.extend`
  max-width: 48px;
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
        favicon: '',
        image: {
          palette: [0]
        }
      }
    }
  }

  onChange (newState) {
    try {
      const {data} = JSON.parse(newState)
      this.setState({data})
    } catch (err) {
      console.log(err)
    }
  }

  fetchUrl (url) {
    fetch(url)
      .then(res => res.json())
      .then(({data}) => {
        data && this.setState({url, data})
      })
  }

  debounceFetchUrl (url) {
    clearTimeout(this.debouncedSetState)
    this.debouncedSetState = setTimeout(() => {
      this.fetchUrl(url)
    }, DEBOUNCE_MS)
  }

  componentDidMount () {
    this.fetchUrl(this.props.url)
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.url !== nextState.url) this.debounceFetchUrl(nextProps.url)
  }

  render () {
    const {url, ...props} = this.props
    const {favicon, publisher, description, image} = this.state.data
    const {palette = ['#ccc']} = image

    return (
      <Container is='section' {...props}>
        <Provider
          mountStylesheet={false}
          code={JSON.stringify(this.state, null, 2)}>
          <Row justify='space-around' direction='row' align='center' wrap>
            <PreviewCard
              size={[395, 500]}
              my={3}
              style={{boxShadow: `rgb(206, 212, 218) 0 32px 64px 0`}}
              >
              <Editor width={[ 1, 1, 1 / 2 ]} onChange={this.onChange} />
            </PreviewCard>

            <Tilt className='tilt' options={{ max: 8, scale: 1.02 }}>
              <PreviewCard
                size={[395, 500]}
                my={3}
                style={{boxShadow: `${palette[0] || 'rgb(206, 212, 218)'}  0 32px 64px 0`}}
              >

                <BackgroundImage
                  ratio={1 / 2}
                  src={image.url}
                  style={{position: 'relative'}}
              >
                  <CardHeader p={3} width='100%'
                    style={{background: '#f7f8fa'}}>
                    <Flex align='flex-start'>
                      <CardHeaderLogo
                        src={favicon.url || favicon || image.url || image} />
                      <CardHeaderBody ml={2} mt={2}>
                        <Truncate>{publisher}</Truncate>
                        <Truncate>{description}</Truncate>
                      </CardHeaderBody>
                    </Flex>
                  </CardHeader>
                </BackgroundImage>
              </PreviewCard>
            </Tilt>
          </Row>
        </Provider>
      </Container>
    )
  }
}
