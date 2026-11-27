import Caption from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import { layout, theme } from 'theme'
import React from 'react'

import { Button } from 'components/elements/Button/Button'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Input from 'components/elements/Input/Input'
import Meta from 'components/elements/Meta/Meta'
import { useSignupForm } from 'components/hook/use-signup-form'

export const Head = () => (
  <Meta description='Create a free Microlink account to get product updates and early access to new releases.' />
)

const NewsletterPage = () => {
  const { href, onSubmit } = useSignupForm({ cta: 'newsletter:form' })

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
          Create a free account to get product updates and early access to new
          releases. We email you a sign-in link to confirm the address.
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
              <form action={href} method='get' onSubmit={onSubmit}>
                <Flex>
                  <Input
                    type='email'
                    name='email'
                    placeholder='you@domain.com'
                    autoComplete='email'
                    inputMode='email'
                    spellCheck={false}
                    label='Email address'
                    autoFocus
                    css={theme({ width: ['10rem', null, '16rem'] })}
                    required
                  />

                  <Button
                    type='submit'
                    data-event-location='Newsletter'
                    data-event-name='Sign up'
                    css={theme({ ml: 2 })}
                  >
                    Sign up
                  </Button>
                </Flex>
              </form>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default NewsletterPage
