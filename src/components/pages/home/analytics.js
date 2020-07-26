import { Hide, Box, Caps, Flex, Subhead } from 'components/elements'
import { Block, Caption } from 'components/patterns'
import { useAnalytics } from 'components/hook'
import { fadeIn } from 'components/keyframes'
import React, { useState } from 'react'
import styled from 'styled-components'
import take from 'lodash/take'
import theme from 'theme'

const Separator = styled(Box)`
  border-right: 1px solid ${theme.colors.white20};
  width: 1px;
`

export default props => {
  const { reqs_pretty: reqsPretty, bytes_pretty: bytesPretty } = useAnalytics()

  const bytes = (() => {
    const [value, unit] = bytesPretty.split(' ')
    const fixedValue = Number(value).toFixed(0)
    return `${fixedValue}${unit}`
  })()

  const stats = [
    { value: 240, name: 'CDN Edges' },
    { value: reqsPretty, name: 'reqs per month' },
    { value: bytes, name: 'data served' },
    { value: '99.9%', name: 'uptime' }
  ]

  const sentences = [
    'Get HTML content',
    'Take screenshots in ~2 seg',
    'Turn websites into data',
    'Run a Ligthouse audit',
    'Detect technology stack'
  ]

  const [index, setIndex] = useState(0)

  const handleClick = event => {
    if (event.target.tagName !== 'SELECT' && event.target.tagName !== 'SPAN') {
      setIndex((index + 1) % sentences.length)
    }
  }

  const sentence = sentences[index]

  const blockOne = (
    <Flex
      as='section'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Subhead color='pink' titleize={false} children='Cloud Browser for' />
      <Subhead
        py={3}
        titleize={false}
        color='white'
        key={sentence}
        css={fadeIn}
        style={{ cursor: 'pointer' }}
        children={sentence}
      />
    </Flex>
  )

  const Stat = ({ value, name, isLast }) => (
    <Flex>
      <Flex alignItems='center' flexDirection='column'>
        <Subhead as='div' color='white40' titleize={false} children={value} />
        <Caption
          color='pink'
          fontWeight='bold'
          titleize={false}
          style={{ opacity: 0.8 }}
        >
          <Caps titleize={false} mt={[1, 1, 0, 0]} children={name} />
        </Caption>
      </Flex>
      {!isLast && <Separator mt={[1, 1, 0, 0]} mx={[3, 3, 4, 4]} />}
    </Flex>
  )

  const blockTwo = (
    <>
      <Hide breakpoints={[0, 1]}>
        <Flex width='100%' justifyContent='space-around'>
          {stats.map((stat, index) => (
            <Stat
              key={stat.name}
              isLast={index === stats.length - 1}
              {...stat}
            />
          ))}
        </Flex>
      </Hide>
      <Hide breakpoints={[2, 3]}>
        <Flex width='100%' justifyContent='space-around'>
          {take(stats, stats.length - 1).map((stat, index) => (
            <Stat
              key={stat.name}
              isLast={index === stats.length - 2}
              {...stat}
            />
          ))}
        </Flex>
      </Hide>
    </>
  )

  return (
    <Block
      id='analytics'
      flexDirection='column'
      onClick={handleClick}
      blockOne={blockOne}
      blockTwo={blockTwo}
      {...props}
    />
  )
}
