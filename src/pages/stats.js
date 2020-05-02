import { Container, Box, Flex, Text, DotSpinner } from 'components/elements'
import { KubernetesMonitor, Layout } from 'components/patterns'
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
      ? { labelColor: 'black50', color: 'black', bg: 'white' }
      : { labelColor: 'white50', color: 'white', bg: 'black' }

  return (
    <KubernetesMonitor>
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
            <Container maxWidth='100%' px={[5, 5, 4, 4]}>
              <Box id='stats'>
                {isLoading ? (
                  <Text
                    style={{ whiteSpace: 'pre', fontFamily: 'monospace' }}
                    color={color}
                    fontSize={[0, 0, 1, 1]}
                    children={`\n${data}`}
                  />
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
    </KubernetesMonitor>
  )
}
