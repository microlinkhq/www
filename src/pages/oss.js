import { Headline, DotsBackground, Layout } from 'components/patterns'
import { Link, Text, Flex, Box } from 'components/elements'
import { useOss } from 'components/hook'
import { layout } from 'theme'
import React from 'react'
import { Star as StarIcon } from 'react-feather'

export default () => {
  const repos = useOss()
  return (
    <DotsBackground alignItems='center' justifyContent='center'>
      <Layout footer={{ bg: 'transparent' }}>
        <Flex
          px={4}
          pt={4}
          pb={4}
          width='100%'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <Headline title='Open Source Software' pb={3} />
          <Text
            fontSize={[2, 2, 2, 3]}
            fontWeight='regular'
            mb={4}
            textAlign='center'
            maxWidth={10}
          >
            Because Open Source plays a major part in how we build our products,
            we see it as a matter of course to give the same effort back to our
            community by creating valuable, free and easy-to-use software.
          </Text>
          <Flex width='100%' maxWidth={layout.medium} flexDirection='column'>
            {repos.map(({ name, description, stars, url }) => (
              <Box key={name} mb={2} borderBottom={1} borderColor='black05'>
                <Link color='black' href={url}>
                  <Text
                    fontWeight='bold'
                    mr={3}
                    display='inline-block'
                    width='150px'
                    children={name}
                  />
                  <Flex style={{ float: 'right' }}>
                    <Text mr={1} children={stars} />
                    <StarIcon color='black' width='16px' />
                  </Flex>
                  <Text color='black50' children={description} mb={2} />
                </Link>
              </Box>
            ))}
          </Flex>
        </Flex>
      </Layout>
    </DotsBackground>
  )
}
