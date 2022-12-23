import { Container, Box, Hide } from 'components/elements'
import { layout } from 'theme'
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

      <Caption pt={[3, 3, 4, 4]} pb={3} width='100%' textAlign='left'>
        {caption}
      </Caption>

      <Hide
        as='ul'
        breakpoints={[1, 2, 3]}
        style={{ margin: 0, width: '100%', paddingLeft: 0 }}
      >
        <Grid as='div' itemsPerRow={1}>
          {features}
        </Grid>
      </Hide>

      <Hide
        as='ul'
        breakpoints={[0]}
        style={{ margin: 0, width: '100%', paddingLeft: 0 }}
      >
        <Grid as='div' pt={3} itemsPerRow={3}>
          {features}
        </Grid>
      </Hide>
    </Container>
  )
}

export default Features
