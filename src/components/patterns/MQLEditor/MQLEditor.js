import { shadows, breakpoints } from 'theme'
import Microlink from '@microlink/react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Choose } from 'react-extras'
import { match } from 'styled-is'

import {
  CodeEditor,
  MultiCodeEditor,
  Card,
  Box,
  Flex,
  Iframe
} from 'components/elements'

import * as code from './code'
import * as data from './data'

const TYPES = ['meta', 'iframe', 'screenshot', 'pdf', 'insights']
const MODES = ['preview', 'json', 'code']

const MicrolinkCard = styled(Microlink)`
  --microlink-hover-background-color: white;

  width: 100%;

  @media screen and (max-width: ${breakpoints[1]}) {
    .microlink_card__content {
      display: none;
    }
  }
`

const MQLCard = styled(Card)`
  &:hover {
    box-shadow: ${shadows[0]};
  }

  ${match('type', 'screenshot')`
  ${match('mode', 'preview')`
    background-image: url("${data.screenshotUrl}");
    background-size: cover;
    background-position: center;
    box-shadow: none;
    `}
  `};

  ${match('type', 'iframe')`
    ${match('mode', 'preview')`
      display: flex;
      justify-content: center;
      background-color: transparent;
      box-shadow: none;
      &:hover {
        box-shadow: none;
      }
    `}
  `};
`

export default props => {
  const [mode, setMode] = useState(MODES[0])
  const [type, setType] = useState(TYPES[0])

  return (
    <Flex
      mt={3}
      flexDirection='column'
      justifyContent='space-around'
      {...props}
    >
      <Flex flexDirection='column' mb={[4, 0]}>
        <Choose>
          <MQLCard mode={mode} type={type}>
            <Choose.When condition={mode === 'preview'}>
              <Choose>
                <Choose.When condition={type === 'pdf'}>
                  <Iframe src={data.pdfUrl} />
                </Choose.When>
                <Choose.When condition={type === 'insights'}>
                  <Iframe src={data.insightsUrl} />
                </Choose.When>
                <Choose.When condition={type === 'meta' || type === 'iframe'}>
                  <MicrolinkCard
                    fetchData={false}
                    media={type === 'iframe' ? 'iframe' : 'video'}
                    style={{ border: '0', height: 'inherit', maxWidth: '100%' }}
                    url={data[type] && data[type].url}
                    setData={data[type]}
                    size='large'
                  />
                </Choose.When>
              </Choose>
            </Choose.When>
            <Choose.When condition={mode === 'json'}>
              <CodeEditor
                language='json'
                children={JSON.stringify(data[type], null, 2)}
              />
            </Choose.When>
            <Choose.When condition={mode === 'code'}>
              <MultiCodeEditor width='100%' languages={code[type]} />
            </Choose.When>
          </MQLCard>
        </Choose>
        <Flex pl='15px' pr='7px' justifyContent='space-between'>
          <Box pt={3}>
            {MODES.map(children => (
              <Card.Option
                key={children}
                value={mode}
                children={children}
                onClick={() => setMode(children)}
              />
            ))}
          </Box>
          <Box pt={3}>
            {TYPES.map(children => (
              <Card.Option
                key={children}
                children={children}
                value={type}
                onClick={() => setType(children)}
              />
            ))}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
