import React from 'react'
import { Flex, Text, Link } from 'components/elements'
import isUrl from 'is-url-http/lightweight'
import truncate from 'lodash/truncate'
import humanizeUrl from 'humanize-url'

const Origin = ({ children, ...props }) => {
  return isUrl(children) ? (
    <Link icon {...props} href={children}>
      {truncate(humanizeUrl(children), {
        length: 40,
        omission: '…'
      })}
    </Link>
  ) : (
    <Text color='gray7' {...props}>
      {children.toLowerCase()}
    </Text>
  )
}

const Header = () => (
  <Flex flexDirection='row' borderBottom={1} borderColor='gray2' py={3}>
    <Text
      as='span'
      color='gray7'
      fontWeight='bold'
      width={3 / 4}
      children='URL'
    />
    <Text
      as='span'
      color='gray7'
      fontWeight='bold'
      width={1 / 4}
      children='Total CPU Time'
    />
    <Text
      as='span'
      color='gray7'
      fontWeight='bold'
      width={1 / 4}
      children='Script Evaluation'
    />
    <Text
      as='span'
      color='gray7'
      fontWeight='bold'
      width={1 / 4}
      children='Script Parse'
    />
  </Flex>
)

const msecs = str => Number(str.toFixed(0)).toLocaleString()

export default ({ bootupTime, ...props }) => {
  return (
    <Flex
      pt={3}
      width='100%'
      justifyContent='space-around'
      flexDirection='column'
      {...props}
    >
      <Header />
      {bootupTime.details.items.map(
        ({ url, total, scripting, scriptParseCompile }) => (
          <Flex
            key={url}
            flexDirection='row'
            borderBottom={1}
            borderColor='gray2'
            py={3}
          >
            <Origin width={3 / 4} as='span' children={url} />
            <Text color='gray7' width={1 / 4} as='span'>
              {msecs(total)}ms
            </Text>
            <Text color='gray7' width={1 / 4} as='span'>
              {msecs(scripting)}ms
            </Text>
            <Text color='gray7' width={1 / 4} as='span'>
              {msecs(scriptParseCompile)}ms
            </Text>
          </Flex>
        )
      )}
    </Flex>
  )
}
