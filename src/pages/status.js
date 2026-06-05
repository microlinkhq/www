import ClusterMonitor from 'components/patterns/ClusterMonitor/ClusterMonitor'
import Layout from 'components/patterns/Layout'
import { useQueryState } from 'components/hook/use-query-state'
import { cdnUrl } from 'helpers/cdn-url'
import React from 'react'
import { theme as themeProp } from 'theme'

import Box from 'components/elements/Box'
import Choose from 'components/elements/Choose'
import DotSpinner from 'components/elements/DotSpinner'
import Flex from 'components/elements/Flex'
import Meta from 'components/elements/Meta/Meta'
import Text from 'components/elements/Text'

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
  const [{ cluster }] = useQueryState()

  const endpoint = new URL(cluster || '', 'https://k8s.microlink.io').toString()

  return (
    <ClusterMonitor endpoint={endpoint}>
      {({ isLoading, resume, info }) => {
        return (
          <Layout
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
                        fontSize: 4,
                        pt: [2, null, 3]
                      })}
                    >
                      Please wait
                      <DotSpinner />
                    </Text>
                  </Flex>
                </Choose.When>
                <Choose.Otherwise>
                  <Monospace>$ watch curl -sL {endpoint}</Monospace>
                  <Monospace>{`\n${resume}`}</Monospace>
                  <Monospace css={themeProp({ fontSize: [0, null, 1] })}>
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
