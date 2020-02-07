import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'

import { Box, Card } from 'components/elements'
import { Lighthouse } from 'components/patterns'

const data = [
  { text: 'Performance', value: 100 },
  { text: 'Accessibility', value: 95 },
  { text: 'Best Practices', value: 90 },
  { text: 'SEO', value: 85 },
  { text: 'PWA', value: 44 }
]

const code = `
import { List } from 'components/patterns'

export default () => (
  <Lighthouse data={${JSON.stringify(data, null, 2)}} />
)
`

storiesOf('Patterns', module).add('Lighthouse', () => (
  <>
    <Story name='Lighthouse' code={code} width='960px'>
      <Box px={4}>
        <Lighthouse data={data} />
      </Box>
      <Box pt={4} />
      <Card
        justifyContent='center'
        alignItems='center'
        width='935px'
        height='180px'
        px={4}
      >
        <Lighthouse data={data} width='60px' />
      </Card>
    </Story>
  </>
))
