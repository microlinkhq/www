import {
  Caps,
  Container,
  Box,
  Flex,
  Text,
  DotSpinner
} from 'components/elements'
import { Layout } from 'components/patterns'
import React, { useState } from 'react'
import { layout } from 'theme'
import useSWR from 'swr'

const Key = props => <Caps fontWeight='normal' fontSize={1} {...props} />

const Value = props => (
  <Text
    fontWeight='regular'
    lineHeight={0}
    fontSize={[4, 5, 6, 7]}
    {...props}
  />
)

const API = 'https://kubernetes-monitor-api.now.sh'

export default () => {
  const [theme, setTheme] = useState('dark')

  const { data } = useSWR(
    API,
    () => window.fetch(API).then(res => res.json()),
    { refreshInterval: 3000 }
  )

  const toggleTheme = () =>
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'))

  const { labelColor, color, bg } =
    theme === 'light'
      ? { labelColor: 'black50', color: 'black', bg: 'white' }
      : { labelColor: 'white50', color: 'white', bg: 'black' }

  return (
    <Layout onClick={toggleTheme} theme={theme} style={{ background: bg }}>
      <Container maxWidth={layout.medium} px={[6, 6, 4, 4]}>
        {data ? (
          <>
            <Flex
              pt={[3, 3, 5, 5]}
              justifyContent='center'
              flexDirection={['column', 'column', 'row', 'row']}
            >
              <Box mb={[3, 3, 0, 0]} mr={[0, 0, 5, 5]}>
                <Key color={labelColor}>API</Key>
                <Value color={color}>v{data.apiVersion}</Value>
              </Box>
              <Box mb={[3, 3, 0, 0]} mr={[0, 0, 5, 5]}>
                <Key color={labelColor}>Deployed</Key>
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
                  <Value color={color} mr={[4, 4, 5, 5]}>
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
              pt={[3, 3, 6, 6]}
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
      </Container>
    </Layout>
  )
}
