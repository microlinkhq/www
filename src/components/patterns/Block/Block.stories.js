import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'

import { Box, Text } from 'components/elements'
import { Block } from 'components/patterns'

storiesOf('Patterns', module).add('Block', () => (
  <>
    <Story name='Block' width='100%'>
      <Block
        top={
          <Box bg='pink' borderRadius={2} borderColor='gray'>
            <Text py={3} textAlign='center' children='<top/>' color='black80' />
          </Box>
        }
        blockOne={
          <Box bg='blue' width='40vw' borderRadius={2} borderColor='gray'>
            <Text
              py={3}
              textAlign='center'
              children='<blockOne />'
              color='black80'
            />
          </Box>
        }
        blockTwo={
          <Box bg='red' width='40vw' borderRadius={2} borderColor='gray'>
            <Text
              py={3}
              textAlign='center'
              children='<blockTwo />'
              color='black80'
            />
          </Box>
        }
        bottom={
          <>
            <Box bg='violet' borderRadius={2} borderColor='gray'>
              <Text
                py={3}
                textAlign='center'
                children='<bottom />'
                color='black80'
              />
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
            <Text py={3} textAlign='center' children='<top/>' color='black80' />
          </Box>
        }
        blockOne={
          <Box bg='blue' width='40vw' borderRadius={2} borderColor='gray'>
            <Text
              py={3}
              textAlign='center'
              children='<blockOne />'
              color='black80'
            />
          </Box>
        }
        blockTwo={
          <Box mt={3} bg='red' width='40vw' borderRadius={2} borderColor='gray'>
            <Text
              py={3}
              textAlign='center'
              children='<blockTwo />'
              color='black80'
            />
          </Box>
        }
        bottom={
          <>
            <Box bg='violet' borderRadius={2} borderColor='gray'>
              <Text
                py={3}
                textAlign='center'
                children='<bottom />'
                color='black80'
              />
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
            <Text py={3} textAlign='center' children='<top/>' color='black80' />
          </Box>
        }
        blockOne={
          <Box bg='blue' width='40vw' borderRadius={2} borderColor='gray'>
            <Text
              py={3}
              textAlign='center'
              children='<blockOne />'
              color='black80'
            />
          </Box>
        }
        blockTwo={
          <Box mt={3} bg='red' width='40vw' borderRadius={2} borderColor='gray'>
            <Text
              py={3}
              textAlign='center'
              children='<blockTwo />'
              color='black80'
            />
          </Box>
        }
        bottom={
          <>
            <Box bg='violet' borderRadius={2} borderColor='gray'>
              <Text
                py={3}
                textAlign='center'
                children='<bottom />'
                color='black80'
              />
            </Box>
          </>
        }
      />
    </Story>
  </>
))
