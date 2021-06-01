import { ClusterMonitor, Layout } from 'components/patterns'
import { useTheme, useQueryState } from 'components/hook'
import React from 'react'

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

const THEMES = {
  light: { color: 'black', bg: 'white' },
  dark: { color: 'white', bg: 'black' }
}

const StatusPage = () => {
  const [{ theme, color, bg }, setTheme] = useTheme(THEMES, 'light')
  const [{ cluster }] = useQueryState()

  const endpoint = new URL(cluster || '', 'https://k8s.microlink.io').toString()
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

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
