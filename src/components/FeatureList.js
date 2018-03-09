import { space } from 'styled-system'

import styled from 'styled-components'
import {Flex, Text} from 'rebass'
import React from 'react'

import {LinkSolid} from './Link'

const CustomUl = styled.ul`
${space}
font-size: 2em;
list-style: none;
padding: 0;
`

const Li = styled.li`
  ${space}

  margin: 0;
  margin-bottom: 1em;
  padding-left: 1.5em;
  position: relative;

   &:after {
     font-family: monospace;
     content: '✓';
     display: block;
     position: absolute;
     top: .5em;
     left: 0;
   }
`

export default () => (
  <Flex justify='center' align='center'>
    <CustomUl mx={[4, 4]}>
      <Li p={3}>
        <Text f={[2, 4]}>
          Enrich your content using our <LinkSolid href='https://docs.microlink.io' target='_blank'>API</LinkSolid>.
        </Text>
      </Li>
      <Li p={3}>
        <Text f={[2, 4]}>
          Provide an <LinkSolid href='https://docs.microlink.io/#url' target='_blank'>url</LinkSolid> for extracting the information.
        </Text>
      </Li>
      <Li p={3}>
        <Text f={[2, 4]}>
          Get <LinkSolid href='https://docs.microlink.io/#palette' taget='_blank'>palette colors</LinkSolid> associated per each image.
        </Text>
      </Li>
      <Li p={3}>
        <Text f={[2, 4]}>
          Take <LinkSolid href='https://docs.microlink.io/#screenshot' target='_blank'>screenshots</LinkSolid>, partial or full page.
        </Text>
      </Li>
      <Li p={3}>
        <Text f={[2, 4]}>
          <LinkSolid href='https://docs.microlink.io/#embeded-support' target='_blank'>Embed</LinkSolid> the content in your HTML markup.
        </Text>
      </Li>
    </CustomUl>
  </Flex>
)
