import { Container, Box, Flex, Text, DotSpinner } from 'components/elements'
import { ClusterMonitor, Layout } from 'components/patterns'
import React, { useState } from 'react'

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
          >
            <Container maxWidth='100%' px={3}>
              <Box id='stats'>
                {isLoading ? (
                  <>
                    <Text
                      pt={[0, 0, 0, 3]}
                      color={color}
                      textAlign='center'
                      style={{ fontFamily: 'monospace' }}
                    >
                      $ watch curl -sL https://k8s.microlink.io/
                    </Text>
                    <Text
                      style={{ whiteSpace: 'pre', fontFamily: 'monospace' }}
                      color={color}
                      fontSize={[0, 0, 1, 1]}
                      children={`\n${data}`}
                    />
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
      }}
    </ClusterMonitor>
  )
}
