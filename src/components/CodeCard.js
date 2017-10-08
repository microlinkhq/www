import React from 'react'

import {Border, BackgroundImage, Card, Box, Text, Flex, Heading} from 'rebass'
import Container from './Container'

const PreviewCard = () => (
  <Card width={512} height={269}>
    <BackgroundImage
      ratio={0.8}
      src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20'
    />
    <Box p={3}>
      <Heading f='24px'>Mayweather vs. McGregor</Heading>
      <Border my={3} bottom />
      <Text f='16px'>Much to the surprise of boxing fans, the Floyd Mayweather vs. Conor McGregor spectacle turned out to be a genuinely good fight, writes Mike Downey.</Text>
    </Box>
  </Card>
)

export default () => (
  <Container bg='#fafcfd' p={4}>
    <Flex justify='space-around' direction='row' align='center'>
      <PreviewCard />
      <PreviewCard />
    </Flex>
  </Container>
)
