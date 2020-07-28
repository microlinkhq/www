import { Container, Box, Hide } from 'components/elements'
import { Caption, Grid } from 'components/patterns'
import { layout } from 'theme'
import take from 'lodash/take'
import React from 'react'

export default ({ title, caption, features, ...props }) => {
  return (
    <Container
      id='features'
      alignItems='center'
      maxWidth={[layout.normal, layout.normal, layout.large, layout.large]}
      {...props}
    >
      <Box textAlign='left' width='100%'>
        {title}
      </Box>

      <Caption
        pt={[3, 4, 4, 4]}
        pb={[4, 4, 4, 5]}
        width='100%'
        textAlign='left'
      >
        {caption}
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
