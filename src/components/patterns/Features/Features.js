import { Container, Box, Hide } from 'components/elements'
import { layout } from 'theme'
import take from 'lodash/take'
import React from 'react'

import Grid from '../Grid'
import Caption from '../Caption/Caption'

const Features = ({ title, caption, features, ...props }) => {
  return (
    <Container
      as='section'
      id='features'
      alignItems='center'
      maxWidth={[layout.normal, layout.normal, layout.large, layout.large]}
      {...props}
    >
      <Box textAlign='left' width='100%'>
        {title}
      </Box>

      <Caption
        pt={[3, 3, 4, 4]}
        pb={[4, 4, 4, 5]}
        width='100%'
        textAlign='left'
      >
        {caption}
      </Caption>

      <Hide breakpoints={[1, 2, 3]} style={{ width: '100%' }}>
        <Grid pt={3} itemsPerRow={2}>
          {take(features, features.length - 1)}
        </Grid>
      </Hide>

      <Hide breakpoints={[0]} style={{ width: '100%' }}>
        <Grid pt={3} itemsPerRow={3}>
          {features}
        </Grid>
      </Hide>
    </Container>
  )
}

export default Features
