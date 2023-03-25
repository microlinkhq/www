import { Star as StarIcon, AlertCircle as IssueIcon } from 'react-feather'
import { Meta, Heading, Link, Text, Flex, Box } from 'components/elements'
import { Caption, DotsBackground, Layout } from 'components/patterns'
import { cdnUrl, formatNumber } from 'helpers'
import { useOss } from 'components/hook'
import { layout } from 'theme'
import React from 'react'

export const Head = () => (
  <Meta
    description='Open Source Sustainability.'
    image={cdnUrl('banner/oss.jpeg')}
  />
)

const OssPage = () => {
  const repos = useOss()
  return (
    <DotsBackground alignItems='center' justifyContent='center'>
      <Layout footer={{ bg: 'transparent' }}>
        <Flex
          pt={2}
          px={3}
          width='100%'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <Heading titleize={false} maxWidth={layout.large}>
            Open Source Software
          </Heading>

          <Caption
            as='h2'
            pt={[3, 3, 4, 4]}
            px={4}
            titleize={false}
            maxWidth={layout.small}
          >
            It’s our great privilege to build our products using open source
            software (OSS) and we want to give the same effort back.
          </Caption>

          <Flex
            pt={[3, 3, 4, 4]}
            px={[2, 2, 4, 4]}
            width='100%'
            maxWidth={layout.normal}
            flexDirection='column'
          >
            {repos.map(({ name, description, stars, issues, url }) => (
              <Box key={name} mb={3} borderBottom={1} borderColor='black05'>
                <Link color='black' href={url} icon={false}>
                  <Text
                    as='h3'
                    fontWeight='bold'
                    mr={3}
                    display='inline-block'
                    width='240px'
                  >
                    {name}
                  </Text>
                  <Flex color='black' style={{ float: 'right' }}>
                    <Flex alignItems='center' mr={3}>
                      <Text mr={1}>{formatNumber(stars)}</Text>
                      <StarIcon width='16px' />
                    </Flex>
                    <Flex alignItems='center'>
                      <Text mr={1}>{issues}</Text>
                      <IssueIcon width='16px' />
                    </Flex>
                  </Flex>
                  <Text color='black60' mt={2} mb={2} width='80%'>
                    {description}
                  </Text>
                </Link>
              </Box>
            ))}
          </Flex>
        </Flex>
      </Layout>
    </DotsBackground>
  )
}

export default OssPage
