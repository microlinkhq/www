import { ClusterMonitor, Layout } from 'components/patterns'
import { useTheme, useQueryState } from 'components/hook'
import { cdnUrl } from 'helpers'
import React from 'react'

import {
  Choose,
  Container,
  Box,
  Flex,
  Text,
  DotSpinner
} from 'components/elements'

const THEMES = {
  light: { color: 'black', bg: 'white' },
  dark: { color: 'white', bg: 'black' }
}

const Monospace = ({ style, ...props }) => (
  <Text
    fontFamily='monospace'
    textAlign='center'
    maxWidth={['95vw', '95vw', '100%', '100%']}
    style={{
      whiteSpace: 'pre',
      overflowY: 'scroll',
      margin: 'auto',
      ...style
    }}
    {...props}
  />
)

const StatusPage = () => {
  const [{ theme, color, bg }, setTheme] = useTheme(THEMES, 'light')
  const [{ cluster }] = useQueryState()

  const endpoint = new URL(cluster || '', 'https://k8s.microlink.io').toString()
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  return (
    <ClusterMonitor endpoint={endpoint}>
      {({ isLoading, resume, info }) => {
        return (
          <Layout
            head={{
              description:
                'Real-time data of the Microlink systems performance.',
              image: cdnUrl('banner/status.jpeg')
            }}
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
                    <Text
                      fontWeight='regular'
                      fontFamily='mono'
                      lineHeight={0}
                      fontSize={[4, 4, 4, 7]}
                      pt={[2, 2, 3, 3]}
                      color={color}
                    >
                      Loading <DotSpinner />
                    </Text>
                  </Flex>
                </Choose.When>
                <Choose.Otherwise>
                  <Monospace color={color}>
                    $ watch curl -sL {endpoint}
                  </Monospace>
                  <Monospace color={color}>{`\n${resume}`}</Monospace>
                  <Monospace color={color} fontSize={[0, 0, 1, 1]}>
                    {`\n${info}`}
                  </Monospace>
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
