import { Container, Box, Flex, Text, DotSpinner } from 'components/elements'
import { ClusterMonitor, Layout } from 'components/patterns'
import React, { useState } from 'react'
import { Choose } from 'react-extras'

const Value = props => (
  <Text
    fontWeight='regular'
    lineHeight={0}
    fontSize={[4, 4, 4, 7]}
    {...props}
  />
)

export default () => {
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () =>
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'))

  const { color, bg } =
    theme === 'light'
      ? { labelColor: 'black60', color: 'black', bg: 'white' }
      : { labelColor: 'white60', color: 'white', bg: 'black' }

  return (
    <ClusterMonitor>
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
            <Box id='stats' px={Container.defaultProps.px} pt={5}>
              <Choose>
                <Choose.When condition={isLoading}>
                  <Flex
                    justifyContent='center'
                    alignItems='center'
                    flexDirection={['column', 'column', 'row', 'row']}
                  >
                    <Value color={color}>
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
                    $ watch curl -sL https://k8s.microlink.io/
                  </Text>
                  <Text
                    textAlign='center'
                    style={{ whiteSpace: 'pre', fontFamily: 'monospace' }}
                    color={color}
                    fontSize={[0, 0, 1, 1]}
                    children={`\n${data}`}
                  />
                </Choose.Otherwise>
              </Choose>
            </Box>
          </Layout>
        )
      }}
    </ClusterMonitor>
  )
}
