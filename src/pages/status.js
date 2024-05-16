import { ClusterMonitor, Layout } from 'components/patterns'
import { useTheme, useQueryState } from 'components/hook'
import { cdnUrl } from 'helpers'
import React from 'react'
import { theme as themeProp } from 'theme'

import { Box, Choose, DotSpinner, Flex, Meta, Text } from 'components/elements'

const THEMES = {
  light: { color: 'black', bg: 'white' },
  dark: { color: 'white', bg: 'black' }
}

const Monospace = props => (
  <Text
    css={themeProp({
      fontFamily: 'monospace',
      textAlign: 'center',
      maxWidth: ['95vw', '95vw', '100%', '100%'],
      whiteSpace: 'pre',
      overflowY: 'scroll',
      m: 'auto'
    })}
    {...props}
  />
)

export const Head = () => (
  <Meta
    description='Real-time data of the Microlink systems performance.'
    image={cdnUrl('banner/status.jpeg')}
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
            onClick={toggleTheme}
            theme={theme}
            style={{ background: bg }}
            component={Flex}
            css={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Box id='status' css={themeProp({ px: [3, null, 0] })}>
              <Choose>
                <Choose.When condition={isLoading}>
                  <Flex
                    css={themeProp({
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: ['column', null, 'row']
                    })}
                  >
                    <Text
                      css={themeProp({
                        fontWeight: 'regular',
                        fontFamily: 'mono',
                        lineHeight: 0,
                        fontSize: [4, null, null, 7],
                        pt: [2, null, 3],
                        color
                      })}
                    >
                      Loading <DotSpinner />
                    </Text>
                  </Flex>
                </Choose.When>
                <Choose.Otherwise>
                  <Monospace css={themeProp({ color })}>
                    $ watch curl -sL {endpoint}
                  </Monospace>
                  <Monospace
                    css={themeProp({ color })}
                  >{`\n${resume}`}
                  </Monospace>
                  <Monospace css={themeProp({ color, fontSize: [0, null, 1] })}>
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
