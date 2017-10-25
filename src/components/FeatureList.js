import { space } from 'styled-system'

import styled from 'styled-components'
import {Flex, Text} from 'rebass'
import React from 'react'

import Link from './Link'

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
     top: .25em;
     left: 0;
   }
`

export default () => (
  <Flex justify='center' align='center'>
    <CustomUl mx={[4, 4]}>
      <Li pb={[3, 4]}>
        <Text f={[3, 4]}>
          Enrich your content using our <Link href='https://docs.microlink.io' target='_blank'>API</Link>.
        </Text>
      </Li>
      <Li pb={[3, 4]}>
        <Text f={[3, 4]}>
          Provide an <Link href='https://docs.microlink.io/#url' target='_blank'>url</Link> for extracting the information.
        </Text>
      </Li>
      <Li pb={[3, 4]}>
        <Text f={[3, 4]}>
          Get <Link href='https://docs.microlink.io/#palette' taget='_blank'>palette colors</Link> associated per each image.
        </Text>
      </Li>
      <Li pb={[3, 4]}>
        <Text f={[3, 4]}>
          Take <Link href='https://docs.microlink.io/#screenshot' target='_blank'>screenshots</Link>, partial or full page.
        </Text>
      </Li>
      <Li pb={[3, 4]}>
        <Text f={[3, 4]}>
          <Link href='https://docs.microlink.io/#embeded-support' target='_blank'>Embed</Link> the content in your HTML markup.
        </Text>
      </Li>
    </CustomUl>
  </Flex>
)
