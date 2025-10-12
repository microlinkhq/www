import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import Block from './Block'

storiesOf('Patterns', module).add('Block', () => (
  <>
    <Story name='Block' width='100%'>
      <Block
        top={
          <Box bg='pink' borderRadius={2} borderColor='gray'>
            <Text py={3} textAlign='center' color='black80'>
              {'<top/>'}
            </Text>
          </Box>
        }
        blockOne={
          <Box bg='blue' width='40vw' borderRadius={2} borderColor='gray'>
            <Text py={3} textAlign='center' color='black80'>
              {'<blockOne />'}
            </Text>
          </Box>
        }
        blockTwo={
          <Box bg='red' width='40vw' borderRadius={2} borderColor='gray'>
            <Text py={3} textAlign='center' color='black80'>
              {'<blockTwo />'}
            </Text>
          </Box>
        }
        bottom={
          <>
            <Box bg='violet' borderRadius={2} borderColor='gray'>
              <Text py={3} textAlign='center' color='black80'>
                {'<bottom />'}
              </Text>
            </Box>
          </>
        }
      />
    </Story>
    <Story name="Block flexDirection='column'" width='100%'>
      <Block
        flexDirection='column'
        top={
          <Box bg='pink' borderRadius={2} borderColor='gray'>
            <Text py={3} textAlign='center' color='black80'>
              {'<top/>'}
            </Text>
          </Box>
        }
        blockOne={
          <Box bg='blue' width='40vw' borderRadius={2} borderColor='gray'>
            <Text py={3} textAlign='center' color='black80'>
              {'<blockOne />'}
            </Text>
          </Box>
        }
        blockTwo={
          <Box mt={3} bg='red' width='40vw' borderRadius={2} borderColor='gray'>
            <Text py={3} textAlign='center' color='black80'>
              {'<blockTwo />'}
            </Text>
          </Box>
        }
        bottom={
          <>
            <Box bg='violet' borderRadius={2} borderColor='gray'>
              <Text py={3} textAlign='center' color='black80'>
                {'<bottom />'}
              </Text>
            </Box>
          </>
        }
      />
    </Story>
    <Story name="Block flexDirection='row-reverse'" width='100%'>
      <Block
        flexDirection='row-reverse'
        top={
          <Box bg='pink' borderRadius={2} borderColor='gray'>
            <Text py={3} textAlign='center' color='black80'>
              {'<top/>'}
            </Text>
          </Box>
        }
        blockOne={
          <Box bg='blue' width='40vw' borderRadius={2} borderColor='gray'>
            <Text py={3} textAlign='center' color='black80'>
              {'<blockOne />'}
            </Text>
          </Box>
        }
        blockTwo={
          <Box mt={3} bg='red' width='40vw' borderRadius={2} borderColor='gray'>
            <Text py={3} textAlign='center' color='black80'>
              {'<blockTwo />'}
            </Text>
          </Box>
        }
        bottom={
          <>
            <Box bg='violet' borderRadius={2} borderColor='gray'>
              <Text py={3} textAlign='center' color='black80'>
                {'<bottom />'}
              </Text>
            </Box>
          </>
        }
      />
    </Story>
  </>
))
