import { ClusterMonitor, Layout } from 'components/patterns'
import { useQueryState } from 'components/hook'
import React, { useState } from 'react'

import {
  Choose,
  Container,
  Box,
  Flex,
  Text,
  DotSpinner
} from 'components/elements'

const Value = props => (
  <Text
    fontWeight='regular'
    lineHeight={0}
    fontSize={[4, 4, 4, 7]}
    {...props}
  />
)

const StatusPage = () => {
  const [theme, setTheme] = useState('dark')
  const [{ cluster }] = useQueryState()

  const endpoint = new URL(cluster, 'https://k8s.microlink.io').toString()

  const toggleTheme = () =>
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'))

  const { color, bg } =
    theme === 'light'
      ? { labelColor: 'black60', color: 'black', bg: 'white' }
      : { labelColor: 'white60', color: 'white', bg: 'black' }

  return (
    <ClusterMonitor endpoint={endpoint}>
      {({ isLoading, data }) => {
        return (
          <Layout
            onClick={toggleTheme}
            theme={theme}
            style={{ background: bg }}
            component={Flex}
            justifyContent='center'
            alignItems='center'
            maxWidth='100%'
          >
            <Box id='status' px={Container.defaultProps.px}>
              <Choose>
                <Choose.When condition={isLoading}>
                  <Flex
                    justifyContent='center'
                    alignItems='center'
                    flexDirection={['column', 'column', 'row', 'row']}
                  >
                    <Value pt={[2, 2, 3, 3]} color={color}>
                      Loading <DotSpinner />
                    </Value>
                  </Flex>
                </Choose.When>
                <Choose.Otherwise>
                  <Text
                    color={color}
                    textAlign='center'
                    style={{ fontFamily: 'monospace' }}
                  >
                    $ watch curl -sL {endpoint}
                  </Text>
                  <Text
                    textAlign='center'
                    style={{ whiteSpace: 'pre', fontFamily: 'monospace' }}
                    color={color}
                    fontSize={[0, 0, 1, 1]}
                  >
                    {`\n${data}`}
                  </Text>
                </Choose.Otherwise>
              </Choose>
            </Box>
          </Layout>
        )
      }}
    </ClusterMonitor>
  )
}

export default StatusPage
