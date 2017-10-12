import React, {Component} from 'react'

import {hoc, Truncate, Avatar, Text, Box, monospace, Card, Flex, BackgroundImage} from 'rebass'
import Container from './Container'
import styled, {css} from 'styled-components'

import {
  LiveProvider,
  LiveEditor
} from 'react-live'

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
  box-sizing: border-box;
  font-family: ${monospace};
  font-size: 13px;
  margin: 0;
  padding: 16px;
  overflow: auto;
  outline: none;
  tab-size: 2;
  color: ${colors.black};
  background-color: ${colors.gray};
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
max-height: ${props => props.height};
overflow: auto;
${props => props.boxShadow && css`
  box-shadow: 0 32px 64px 0 ${props.boxShadow};
`}
`

const PreviewCard = ({children, ...props}) => (
  <CustomCard width={512} height='256px' {...props}>
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
  border-radius: 0;
  max-width: 48px;
`

const CardHeaderBody = Box.extend`
  flex: 1;
`

export default class extends Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)

    this.state = {
      'author': null,
      'date': null,
      'description': 'Software Engineer, UNIX, JavaScript & Open Source.',
      'favicon': 'https://kikobeats.com/favicon.ico',
      'image': {
        'width': 500,
        'height': 500,
        'type': 'png',
        'url': 'https://kikobeats.com/images/avatar.png',
        'dominantColor': '#D0B5A2',
        'paletteColors': [
          '#D2A386',
          '#2C221F',
          '#934222'
        ]
      },
      'logo': null,
      'publisher': 'Kikobeats',
      'title': 'Kikobeats',
      'url': 'https://kikobeats.com',
      'screenshot': {
        'url': 'https://i.imgur.com/5hPylhL.png',
        'type': 'png',
        'width': 800,
        'height': 600
      }
    }
  }

  onChange (newState) {
    try {
      this.setState({...JSON.parse(newState)})
    } catch (err) {
    }
  }

  render () {
    const {favicon, publisher, description, image} = this.state

    return (
      <Container is='section' {...this.props}>
        <Provider
          mountStylesheet={false}
          code={JSON.stringify(this.state, null, 2)}>
          <Row justify='space-around' direction='row' align='center' wrap>
            <PreviewCard>
              <Editor w={[ 1, 1, 1 / 2 ]} onChange={this.onChange} />
            </PreviewCard>

            <PreviewCard boxShadow={image.paletteColors[0]}>
              <BackgroundImage
                ratio={1 / 2}
                src={image.url}
                style={{position: 'relative'}}
              >
                <CardHeader p={3} width='100%' bg='rgba(255, 255, 255, 0.95)'>
                  <Flex align='flex-start'>
                    <CardHeaderLogo src={favicon} />
                    <CardHeaderBody ml={2} mt={2}>
                      <Truncate>{publisher}</Truncate>
                      <Truncate>{description}</Truncate>
                    </CardHeaderBody>
                  </Flex>
                </CardHeader>
              </BackgroundImage>
            </PreviewCard>
          </Row>
          {/* <Error /> */}
        </Provider>
      </Container>
    )
  }
}
