import { Star as StarIcon, AlertCircle as IssueIcon } from 'react-feather'
import { Caption, DotsBackground, Layout } from 'components/patterns'
import { Heading, Link, Text, Flex, Box } from 'components/elements'
import { useOss } from 'components/hook'
import { layout } from 'theme'
import React from 'react'

export default () => {
  const repos = useOss()
  return (
    <DotsBackground alignItems='center' justifyContent='center'>
      <Layout footer={{ bg: 'transparent' }}>
        <Flex
          pt={[0, 0, 0, 3]}
          px={3}
          width='100%'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <Heading
            titleize={false}
            maxWidth={layout.large}
            children='Open Source Software'
          />

          <Caption
            pt={[3, 3, 4, 4]}
            px={[4, 4, 0, 0]}
            titleize={false}
            maxWidth={layout.small}
            children="It's our great privilege to build our products using open source software (OSS) and we want to give the same effort back."
          />

          <Flex
            pt={[3, 3, 4, 4]}
            width='100%'
            maxWidth={layout.large}
            flexDirection='column'
          >
            {repos.map(({ name, description, stars, issues, url }) => (
              <Box key={name} mb={3} borderBottom={1} borderColor='black05'>
                <Link color='black' href={url}>
                  <Text
                    fontWeight='bold'
                    mr={3}
                    display='inline-block'
                    width='180px'
                    children={name}
                  />
                  <Flex color='black' style={{ float: 'right' }}>
                    <Flex alignItems='center' mr={3}>
                      <Text mr={1} children={stars} />
                      <StarIcon width='16px' />
                    </Flex>
                    <Flex alignItems='center'>
                      <Text mr={1} children={issues} />
                      <IssueIcon width='16px' />
                    </Flex>
                  </Flex>
                  <Text color='black60' children={description} mt={2} mb={2} />
                </Link>
              </Box>
            ))}
          </Flex>
        </Flex>
      </Layout>
    </DotsBackground>
  )
}
