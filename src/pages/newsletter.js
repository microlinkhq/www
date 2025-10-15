import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import { layout, theme } from 'theme'
import FeatherIcon from 'components/icons/Feather'
import React from 'react'

import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Input from 'components/elements/Input/Input'
import Meta from 'components/elements/Meta/Meta'
import { Mail } from 'react-feather'

const Heading = withTitle(HeadingBase)

const Caption = withTitle(CaptionBase)

export const Head = () => (
  <Meta description='Get early access & updates on new releases.' />
)

const NewsletterPage = () => (
  <Layout>
    <Container
      css={theme({ pt: 2, justifyContent: 'center', alignItems: 'center' })}
    >
      <Heading>Newsletter</Heading>

      <Caption
        css={theme({
          pt: [3, null, 4],
          px: 4,
          maxWidth: layout.small
        })}
        titleize={false}
      >
        Get early access & updates on new releases.
      </Caption>

      <Flex
        css={theme({
          alignItems: 'center',
          justifyContent: 'center',
          pt: [0, null, 4]
        })}
      >
        <Flex
          css={theme({
            alignItems: ['center', null, null, 'inherit'],
            flexDirection: 'column'
          })}
        >
          <Flex css={theme({ pt: 3 })}>
            <form
              action='https://microlink.us17.list-manage.com/subscribe/post?u=13504896341022a643b87c538&id=0d0978d452'
              method='post'
            >
              <Flex>
                <Input
                  type='email'
                  name='EMAIL'
                  placeholder='you@domain.com'
                  css={theme({ width: '8rem', fontSize: 0 })}
                  iconComponent={
                    <FeatherIcon
                      icon={Mail}
                      color='black40'
                      size={[0, 0, 1, 1]}
                    />
                  }
                  required
                />

                <Button
                  data-event-location='Footer'
                  data-event-name='Be Notified'
                  css={theme({ ml: 2 })}
                >
                  <Caps css={theme({ fontSize: 0 })}>Be Notified</Caps>
                </Button>
              </Flex>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  </Layout>
)

export default NewsletterPage
