import FeatherIcon from 'components/icons/Feather'
import Meta from 'components/elements/Meta/Meta'
import HeadingBase from 'components/elements/Heading'
import { Link } from 'components/elements/Link/base'
import Text from 'components/elements/Text'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import DotsBackground from 'components/patterns/DotsBackground/DotsBackground'
import Layout from 'components/patterns/Layout'
import { formatNumber } from 'helpers/format-number'
import { cdnUrl } from 'helpers/cdn-url'
import { useOss } from 'components/hook/use-oss'
import { layout, theme } from 'theme'
import React from 'react'

const Heading = withTitle(HeadingBase)

const Caption = withTitle(CaptionBase)

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
                        <FeatherIcon icon='star' size={[0, 0, 1, 1]} />
                      </Flex>
                      <Flex css={{ alignItems: 'center' }}>
                        <Text css={theme({ mr: 1 })}>{issues}</Text>
                        <FeatherIcon icon='alert-circle' size={[0, 0, 1, 1]} />
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
