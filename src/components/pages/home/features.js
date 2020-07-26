import { Container, Subhead, Box, Link, Hide } from 'components/elements'
import { Caption, Grid } from 'components/patterns'
import { layout } from 'theme'
import take from 'lodash/take'
import React from 'react'

import { useFeatures } from 'components/hook'

export default props => {
  const features = useFeatures()

  return (
    <Container
      id='features'
      alignItems='center'
      maxWidth={[layout.normal, layout.normal, layout.large, layout.large]}
      {...props}
    >
      <Box textAlign='left' width='100%'>
        <Subhead width='100%' textAlign='left'>
          Production ready,
        </Subhead>
        <Subhead color='indigo' width='100%' textAlign='left' titleize={false}>
          browser as service
        </Subhead>
      </Box>

      <Caption pt={4} pb={5} width='100%' textAlign='left'>
        There are hidden costs to run your own infrastructure — give your team
        extra boost in performance, ease of use, browser automation made simple
        at cost pricing, full control via{' '}
        <Link href='/docs/api/getting-started/overview'>API</Link>.
      </Caption>

      <Hide breakpoints={[1, 2, 3]} style={{ width: '100%' }}>
        <Grid
          pt={3}
          children={take(features, features.length - 1)}
          itemsPerRow={2}
        />
      </Hide>

      <Hide breakpoints={[0]} style={{ width: '100%' }}>
        <Grid pt={3} children={features} itemsPerRow={3} />
      </Hide>
    </Container>
  )
}
