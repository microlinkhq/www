import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import is from 'styled-is'
import styled from 'styled-components'

import { ButtonSecondary, Card as CardBase, Flex, Box } from 'components/elements'
import { fonts, colors, transition } from 'theme'
import { LiveProvider, LiveEditor } from '../LiveCode'
import EDITOR from './editor'
import Preview from './preview'

import {
  CARD_HEIGHT_DESKTOP,
  CARD_WIDTH_DESKTOP,
  CARD_WIDTH_MOBILE,
  CARD_HEIGHT_MOBILE
} from './theme'

const EDITORS = Object.keys(EDITOR)

const Card = styled(CardBase)`
  &&& {
    box-shadow: 0 10px 40px -10px ${colors.gray1};
    transition: none;
    &:hover {
      transform: none;
      box-shadow: 0;
    }
    &:focus {
      box-shadow: none;
    }
  }
`
const SwitchButton = styled(ButtonSecondary)`
  &&& {
    box-shadow: none;
    font-family: ${fonts.mono};
    cursor: pointer;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 100px;
    letter-spacing: 0.25px;
    transition: color background-color ${transition.short};
    color: ${colors.gray9};
    background-color: ${colors.black05};

    &:focus {
      box-shadow: none;
    }

    &:hover:not([disabled]) {
      opacity: 1;
    }

    ${is('active')`
    color: ${colors.white};
    background-color: ${colors.link};
  `};
  }
`

const Switch = ({ children, active, onChange }) => (
  <Box py={2} px={'20px'} maxWidth={[CARD_WIDTH_MOBILE, CARD_WIDTH_DESKTOP]}>
    {children.map(language => {
      const isActive = active === language
      return (
        <SwitchButton
          active={isActive}
          key={language}
          children={language}
          fontSize={0}
          fontWeight='regular'
          mr={2}
          mb={'12px'}
          onClick={event => {
            event.preventDefault()
            onChange(language)
          }}
        />
      )
    })}
  </Box>
)

export default class extends Component {
  state = { editor: 'React', preview: 'SDK' }

  componentDidUpdate () {
    if (this.node) ReactDOM.findDOMNode(this.node).scrollTop = 0
  }

  render () {
    const { editor: editorLang, preview } = this.state
    const { children, loading } = this.props
    const editor = EDITOR[editorLang]
    const code = editor(children)
    const isSDK = preview === 'SDK'

    return (
      <Flex flexDirection={['column', 'row']} justifyContent='center' alignItems='center'>
        <LiveProvider
          width='100%'
          flexDirection={['column-reverse', 'row']}
          justifyContent='space-between'
          alignItems={['center', 'flex-start']}
          mx={3}
          code={code}
          noInline
        >
          <Flex flexDirection='column'>
            <Card
              px={'20px'}
              py={'25px'}
              width={[CARD_WIDTH_MOBILE, CARD_WIDTH_DESKTOP]}
              height={[CARD_HEIGHT_MOBILE, CARD_HEIGHT_DESKTOP]}
            >
              <LiveEditor
                contentEditable={false}
                language={editor.language || 'js'}
                style={{
                  wordWrap: 'break-word',
                  whiteSpace: editor.whiteSpace || 'pre'
                }}
              />
            </Card>
            <Flex mt={3}>
              <Switch
                children={EDITORS}
                active={this.state.editor}
                onChange={editor => this.setState({ editor })}
              />
            </Flex>
          </Flex>
          <Flex flexDirection='column' mb={[4, 0]}>
            <Card
              ref={node => (this.node = node)}
              px={isSDK ? 0 : '20px'}
              py={isSDK ? 0 : '25px'}
              width={[CARD_WIDTH_MOBILE, CARD_WIDTH_DESKTOP]}
              height={[CARD_HEIGHT_MOBILE, CARD_HEIGHT_DESKTOP]}
              style={{ overflow: isSDK ? 'hidden' : 'auto' }}
            >
              <Preview loading={loading} preview={preview} children={children} />
            </Card>
            <Flex mt={3}>
              <Switch
                children={['SDK', 'JSON']}
                active={this.state.preview}
                onChange={preview => this.setState({ preview })}
              />
            </Flex>
          </Flex>
        </LiveProvider>
      </Flex>
    )
  }
}
