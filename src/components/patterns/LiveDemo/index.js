import React, { Component } from 'react'
import { PrimaryButton, Card as CardBase, Flex } from 'components/elements'
import styled from 'styled-components'
import { fonts, colors } from 'theme'

import { LiveProvider, LiveEditor } from '../LiveCode'
import EDITOR from './editor'
import Preview from './preview'

const EDITORS = Object.keys(EDITOR)

const CARD_RATIO_DESKTOP = 1.2
const CARD_RATIO_MOBILE = 0.8
const CARD_HEIGHT_DESKTOP = `${223.2 * CARD_RATIO_DESKTOP}px`
const CARD_WIDTH_DESKTOP = `${338.6808 * CARD_RATIO_DESKTOP}px`
const CARD_WIDTH_MOBILE = `${338.6808 * CARD_RATIO_MOBILE}px`
const CARD_HEIGHT_MOBILE = `${338.6808 * CARD_RATIO_MOBILE}px`

const Card = styled(CardBase)`
  box-shadow: 0 10px 40px -10px ${colors.gray1};
  &:hover {
    transform: none;
    box-shadow: 0;
  }
  &:focus {
    box-shadow: none;
  }
`
const SwitchButton = styled(PrimaryButton)`
  font-family: ${fonts.mono};
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 100px;

  &:focus {
    box-shadow: none;
  }
`

const Switch = ({ children, active, onChange }) =>
  children.map(language => {
    const isActive = active === language
    return (
      <SwitchButton
        key={language}
        children={language}
        fontSize={0}
        fontWeight='normal'
        mr={2}
        color={isActive ? '#247EFF' : '#333'}
        bg={isActive ? '#E2F1FF' : '#f5f4f9'}
        onClick={event => {
          event.preventDefault()
          onChange(language)
        }}
      />
    )
  })

const URL = 'https://twitter.com/futurism/status/882987478541533189'

export default class extends Component {
  state = { editor: 'React', preview: 'SDK' }

  onChange = data => {
    this.setState(data)
  }

  render () {
    const { editor, preview } = this.state
    const editorCode = EDITOR[editor]({ url: URL })
    const isSDK = preview === 'SDK'
    const isCurl = editor === 'cURL'

    return (
      <Flex flexDirection={['column', 'row']} justifyContent='center' alignItems='center'>
        <LiveProvider
          width='100%'
          flexDirection={['column-reverse', 'row']}
          justifyContent='space-between'
          mx={3}
          alignItems='center'
          code={editorCode}
          noInline
        >
          <Flex flexDirection='column'>
            <Flex mb={3}>
              <Switch
                children={EDITORS}
                active={this.state.editor}
                onChange={editor => this.setState({ editor })}
              />
            </Flex>
            <Card
              px={'20px'}
              py={'25px'}
              width={[CARD_WIDTH_MOBILE, CARD_WIDTH_DESKTOP]}
              height={[CARD_HEIGHT_MOBILE, CARD_HEIGHT_DESKTOP]}
            >
              <LiveEditor
                contentEditable={false}
                language='jsx'
                style={{
                  wordWrap: 'break-word',
                  whiteSpace: isCurl ? 'pre-line' : 'pre'
                }}
              />
            </Card>
          </Flex>
          <Flex flexDirection='column' mb={[5, 0]}>
            <Flex mb={3}>
              <Switch
                children={['SDK', 'JSON']}
                active={this.state.preview}
                onChange={preview => this.setState({ preview })}
              />
            </Flex>
            <Card
              px={isSDK ? 0 : '20px'}
              py={isSDK ? 0 : '25px'}
              width={[CARD_WIDTH_MOBILE, CARD_WIDTH_DESKTOP]}
              height={[CARD_HEIGHT_MOBILE, CARD_HEIGHT_DESKTOP]}
              style={{ overflow: isSDK ? 'hidden' : 'auto' }}
            >
              <Preview preview={preview} url={URL} />
            </Card>
          </Flex>
        </LiveProvider>
      </Flex>
    )
  }
}
