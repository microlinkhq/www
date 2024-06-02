import { Caption, Layout } from 'components/patterns'
import { layout, colors, theme } from 'theme'
import { Mail } from 'react-feather'
import React from 'react'

import {
  Button,
  Caps,
  Container,
  Flex,
  Heading,
  Input,
  Meta
} from 'components/elements'

export const Head = () => (
  <Meta description='Early access & updates on new releases.' />
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
        Early access & updates on new releases.
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
                  iconComponent={<Mail color={colors.black40} size={16} />}
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
