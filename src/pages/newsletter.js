import { withTitle } from 'helpers/hoc/with-title'
import Caption from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import { layout, theme } from 'theme'
import FeatherIcon from 'components/icons/Feather'
import React from 'react'

import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Input from 'components/elements/Input/Input'
import Meta from 'components/elements/Meta/Meta'
import Text from 'components/elements/Text'
import {
  NEWSLETTER_ACTION,
  NewsletterHoneypot,
  useNewsletter
} from 'components/hook/use-newsletter'
import { Mail } from 'react-feather'

const Heading = withTitle(HeadingBase)

export const Head = () => (
  <Meta description='Get early access & updates on new releases.' />
)

const NewsletterPage = () => {
  const { status, message, onSubmit, isLoading } = useNewsletter()

  return (
    <Layout>
      <Flex
        css={theme({
          flexDirection: 'column',
          alignItems: 'center'
        })}
      >
        <Heading>Newsletter</Heading>

        <Caption
          css={theme({
            pt: [3, null, 4],
            px: 4,
            maxWidth: layout.small
          })}
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
                action={NEWSLETTER_ACTION}
                method='post'
                onSubmit={onSubmit}
              >
                <NewsletterHoneypot />
                <Flex>
                  <Input
                    type='email'
                    name='email'
                    placeholder='you@domain.com'
                    autoComplete='email'
                    inputMode='email'
                    aria-label='Email address'
                    css={theme({ width: '8rem' })}
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
                    type='submit'
                    loading={isLoading}
                    data-event-location='Footer'
                    data-event-name='Be Notified'
                    css={theme({ ml: 2 })}
                  >
                    <Caps css={theme({ fontSize: 0 })}>Be Notified</Caps>
                  </Button>
                </Flex>
                <Text
                  role='status'
                  aria-live='polite'
                  css={theme({
                    pt: message ? 2 : 0,
                    fontSize: 0,
                    textAlign: 'center',
                    color: status === 'error' ? 'red8' : 'black80'
                  })}
                >
                  {message}
                </Text>
              </form>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default NewsletterPage
