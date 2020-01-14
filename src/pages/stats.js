import {
  Caps,
  Container,
  Box,
  Flex,
  Text,
  DotSpinner
} from 'components/elements'

import { useSiteMetadata } from 'components/hook'
import { Layout } from 'components/patterns'
import React, { useState } from 'react'
import { layout } from 'theme'
import useSWR from 'swr'

import { screenshotUrl } from 'helpers'

const Key = props => <Caps fontWeight='normal' fontSize={1} {...props} />

const Value = props => (
  <Text
    fontWeight='regular'
    lineHeight={0}
    fontSize={[4, 4, 4, 7]}
    {...props}
  />
)

const API = 'https://kubernetes-monitor-api.now.sh'
const POLLING_INTERVAL = 2000

export default () => {
  const { siteUrl } = useSiteMetadata()

  const image = screenshotUrl(`${siteUrl}/stats`, {
    waitUntil: 'networkidle0',
    element: '#stats'
  })

  const [theme, setTheme] = useState('dark')

  const { data } = useSWR(
    API,
    () => window.fetch(API).then(res => res.json()),
    { refreshInterval: POLLING_INTERVAL }
  )

  const toggleTheme = () =>
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'))

  const { labelColor, color, bg } =
    theme === 'light'
      ? { labelColor: 'black50', color: 'black', bg: 'white' }
      : { labelColor: 'white50', color: 'white', bg: 'black' }

  const hasData = !!data

  return (
    <Layout
      title='stats'
      image={image}
      onClick={toggleTheme}
      theme={theme}
      style={{ background: bg }}
    >
      <Container
        maxWidth={layout.medium}
        px={[5, 5, 4, 4]}
        pt={[hasData ? 0 : 4, hasData ? 0 : 6, 6, 6]}
      >
        <Box id='stats' py={[3, 3, hasData ? 5 : 6, hasData ? 5 : 6]}>
          {hasData ? (
            <>
              <Flex
                justifyContent='center'
                flexDirection={['column', 'column', 'row', 'row']}
              >
                <Box mb={[3, 3, 0, 0]} mr={[0, 0, 5, 5]}>
                  <Key color={labelColor}>API</Key>
                  <Value color={color}>v{data.apiVersion}</Value>
                </Box>
                <Box mb={[3, 3, 0, 0]} mr={[0, 0, 5, 5]}>
                  <Key color={labelColor}>Last Deploy</Key>
                  <Value color={color}>{data.createdAt}</Value>
                </Box>
              </Flex>
              <Flex
                justifyContent='center'
                pt={[2, 2, 4, 4]}
                flexDirection={['column', 'column', 'row', 'row']}
              >
                <Box mb={[3, 3, 0, 0]} mr={[0, 0, 5, 5]}>
                  <Key color={labelColor}>Load</Key>
                  <Value color={color}>{data.status.load}%</Value>
                </Box>
                <Box mb={[3, 3, 0, 0]} mr={[0, 0, 5, 5]}>
                  <Key color={labelColor}>CPU</Key>
                  <Value color={color}>{data.status.cpuUsagePercentage}%</Value>
                </Box>
                <Box mb={[3, 3, 0, 0]} mr={[0, 0, 5, 5]}>
                  <Key color={labelColor}>Memory</Key>
                  <Value color={color}>
                    {data.status.memoryUsagePercentage}%
                  </Value>
                </Box>
                <Box mb={[3, 3, 0, 0]} mr={[0, 0, 5, 5]}>
                  <Key color={labelColor}>Replicas</Key>
                  <Value color={color}>
                    {data.status.currentReplicas} / {data.limits.maxReplicas}
                  </Value>
                </Box>
              </Flex>
              <Flex
                justifyContent='center'
                pt={[2, 2, 4, 4]}
                flexDirection={['column', 'column', 'row', 'row']}
              >
                <Box mb={[3, 3, 0, 0]} mr={[0, 0, 5, 5]}>
                  <Key color={labelColor}>Specs</Key>
                  <Flex>
                    <Value color={color} mr={[3, 3, 4, 4]}>
                      {data.specs.cpus}
                    </Value>
                    <Value color={color}>{data.specs.memory}</Value>
                  </Flex>
                </Box>
              </Flex>
            </>
          ) : (
            <>
              <Flex
                justifyContent='center'
                alignItems='center'
                flexDirection={['column', 'column', 'row', 'row']}
              >
                <Value color={color}>
                  Loading <DotSpinner />
                </Value>
              </Flex>
            </>
          )}
        </Box>
      </Container>
    </Layout>
  )
}
