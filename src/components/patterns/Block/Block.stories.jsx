import React from 'react'
import { theme } from 'theme'
import { Story } from 'story'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import Block from './Block'

export default { title: 'Patterns/Block' }

export const Default = () => (
  <>
    <Story name='Block' css={theme({ width: '100%' })}>
      <Block
        top={
          <Box css={theme({ bg: 'pink', borderRadius: 2, borderColor: 'gray' })}>
            <Text css={theme({ py: 3, textAlign: 'center', color: 'black80' })}>
              {'<top/>'}
            </Text>
          </Box>
        }
        blockOne={
          <Box
            css={theme({
              bg: 'blue',
              width: '40vw',
              borderRadius: 2,
              borderColor: 'gray'
            })}
          >
            <Text css={theme({ py: 3, textAlign: 'center', color: 'black80' })}>
              {'<blockOne />'}
            </Text>
          </Box>
        }
        blockTwo={
          <Box
            css={theme({
              bg: 'red',
              width: '40vw',
              borderRadius: 2,
              borderColor: 'gray'
            })}
          >
            <Text css={theme({ py: 3, textAlign: 'center', color: 'black80' })}>
              {'<blockTwo />'}
            </Text>
          </Box>
        }
        bottom={
          <>
            <Box
              css={theme({ bg: 'violet', borderRadius: 2, borderColor: 'gray' })}
            >
              <Text
                css={theme({ py: 3, textAlign: 'center', color: 'black80' })}
              >
                {'<bottom />'}
              </Text>
            </Box>
          </>
        }
      />
    </Story>
    <Story name="Block flexDirection='column'" css={theme({ width: '100%' })}>
      <Block
        flexDirection='column'
        top={
          <Box css={theme({ bg: 'pink', borderRadius: 2, borderColor: 'gray' })}>
            <Text css={theme({ py: 3, textAlign: 'center', color: 'black80' })}>
              {'<top/>'}
            </Text>
          </Box>
        }
        blockOne={
          <Box
            css={theme({
              bg: 'blue',
              width: '40vw',
              borderRadius: 2,
              borderColor: 'gray'
            })}
          >
            <Text css={theme({ py: 3, textAlign: 'center', color: 'black80' })}>
              {'<blockOne />'}
            </Text>
          </Box>
        }
        blockTwo={
          <Box
            css={theme({
              mt: 3,
              bg: 'red',
              width: '40vw',
              borderRadius: 2,
              borderColor: 'gray'
            })}
          >
            <Text css={theme({ py: 3, textAlign: 'center', color: 'black80' })}>
              {'<blockTwo />'}
            </Text>
          </Box>
        }
        bottom={
          <>
            <Box
              css={theme({ bg: 'violet', borderRadius: 2, borderColor: 'gray' })}
            >
              <Text
                css={theme({ py: 3, textAlign: 'center', color: 'black80' })}
              >
                {'<bottom />'}
              </Text>
            </Box>
          </>
        }
      />
    </Story>
    <Story name="Block flexDirection='row-reverse'" css={theme({ width: '100%' })}>
      <Block
        flexDirection='row-reverse'
        top={
          <Box css={theme({ bg: 'pink', borderRadius: 2, borderColor: 'gray' })}>
            <Text css={theme({ py: 3, textAlign: 'center', color: 'black80' })}>
              {'<top/>'}
            </Text>
          </Box>
        }
        blockOne={
          <Box
            css={theme({
              bg: 'blue',
              width: '40vw',
              borderRadius: 2,
              borderColor: 'gray'
            })}
          >
            <Text css={theme({ py: 3, textAlign: 'center', color: 'black80' })}>
              {'<blockOne />'}
            </Text>
          </Box>
        }
        blockTwo={
          <Box
            css={theme({
              mt: 3,
              bg: 'red',
              width: '40vw',
              borderRadius: 2,
              borderColor: 'gray'
            })}
          >
            <Text css={theme({ py: 3, textAlign: 'center', color: 'black80' })}>
              {'<blockTwo />'}
            </Text>
          </Box>
        }
        bottom={
          <>
            <Box
              css={theme({ bg: 'violet', borderRadius: 2, borderColor: 'gray' })}
            >
              <Text
                css={theme({ py: 3, textAlign: 'center', color: 'black80' })}
              >
                {'<bottom />'}
              </Text>
            </Box>
          </>
        }
      />
    </Story>
  </>
)
