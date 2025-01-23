import { Star as StarIcon, AlertCircle as IssueIcon } from 'react-feather'
import { Meta, Heading, Link, Text, Flex, Box } from 'components/elements'
import { Caption, DotsBackground, Layout } from 'components/patterns'
import { formatNumber } from 'helpers/format-number'
import { cdnUrl } from 'helpers/cdn-url'
import { useOss } from 'components/hook'
import { layout, theme } from 'theme'
import React from 'react'

export const Head = () => (
  <Meta
    title='Open Source Software'
    description='Open Source Sustainability.'
    image={cdnUrl('banner/oss.jpeg')}
  />
)

const OssPage = () => {
  const repositories = useOss()
  return (
    <DotsBackground>
      <Layout footer={{ style: { background: 'transparent' } }}>
        <Flex
          css={theme({
            pt: 2,
            px: 3,
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          })}
        >
          <Heading titleize={false} css={{ maxWidth: layout.large }}>
            Open Source Software
          </Heading>

          <Caption
            forwardedAs='h2'
            css={theme({
              pt: [3, null, 4],
              px: 4,
              maxWidth: layout.small
            })}
            titleize={false}
          >
            It’s our great privilege to build our products using open source
            software (OSS) and we want to give the same effort back.
          </Caption>

          <Flex
            css={theme({
              pt: [3, null, 4],
              px: [2, null, 4],
              width: '100%',
              maxWidth: layout.normal,
              flexDirection: 'column'
            })}
          >
            {repositories.map(
              ({ name, description, stars, issues, url }, index) => (
                <Box
                  key={name}
                  css={theme({
                    mb: index !== repositories.length - 1 ? 3 : 0,
                    borderBottom: 1,
                    borderColor: 'black05'
                  })}
                >
                  <Link css={theme({ color: 'black' })} href={url} icon={false}>
                    <Text
                      as='h3'
                      css={theme({
                        fontWeight: 'bold',
                        mr: 3,
                        display: 'inline-block',
                        width: '240px'
                      })}
                    >
                      {name}
                    </Text>
                    <Flex css={theme({ color: 'black', float: 'right' })}>
                      <Flex css={theme({ alignItems: 'center', mr: 3 })}>
                        <Text css={theme({ mr: 1 })}>
                          {formatNumber(stars)}
                        </Text>
                        <StarIcon width='16px' />
                      </Flex>
                      <Flex css={{ alignItems: 'center' }}>
                        <Text css={theme({ mr: 1 })}>{issues}</Text>
                        <IssueIcon width='16px' />
                      </Flex>
                    </Flex>
                    <Text
                      css={theme({ color: 'black60', my: 2, width: '80%' })}
                    >
                      {description}
                    </Text>
                  </Link>
                </Box>
              )
            )}
          </Flex>
        </Flex>
      </Layout>
    </DotsBackground>
  )
}

export default OssPage
