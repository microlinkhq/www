import { Caption, Layout } from 'components/patterns'
import { Mail } from 'react-feather'
import { layout, colors } from 'theme'
import React from 'react'

import {
  Heading,
  Container,
  Flex,
  Button,
  Caps,
  Input
} from 'components/elements'

const NewsletterPage = () => (
  <Layout
    head={{
      description: 'Early access & updates on new releases.'
    }}
  >
    <Container pt={2} justifyContent='center' alignItems='center'>
      <Heading>Newsletter</Heading>

      <Caption
        pt={[3, 3, 4, 4]}
        px={4}
        titleize={false}
        maxWidth={[layout.small, layout.small, layout.small, layout.small]}
      >
        Early access & updates on new releases.
      </Caption>

      <Flex alignItems='center' justifyContent='center' pt={[0, 0, 4, 4]}>
        <Flex
          alignItems={['center', 'center', 'center', 'inherit']}
          flexDirection='column'
        >
          <Flex pt={3}>
            <form
              action='https://microlink.us17.list-manage.com/subscribe/post?u=13504896341022a643b87c538&id=0d0978d452'
              method='post'
            >
              <Flex>
                <Input
                  type='email'
                  name='EMAIL'
                  placeholder='you@domain.com'
                  width='8rem'
                  fontSize={0}
                  iconComponent={<Mail color={colors.black40} size={16} />}
                  required
                />

                <Button
                  data-event-category='Footer'
                  data-event-action='Be Notified'
                  ml={2}
                >
                  <Caps fontSize={0}>Be Notified</Caps>
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
