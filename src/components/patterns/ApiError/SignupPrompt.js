import React from 'react'
import { theme } from 'theme'
import { Button } from 'components/elements/Button/Button'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import {
  ACTION_LABEL,
  FREE_KEY_FACTS,
  Facts
} from 'components/patterns/CallToAction'
import { SignupLink } from 'components/patterns/SignupLink'
import {
  FREE_PLAN_REQUESTS_PER_DAY,
  KEYLESS_REQUESTS_PER_DAY
} from 'helpers/free-tier'

const PROMPTS = {
  EPROXYNEEDED: {
    slug: 'antibot',
    title: 'This site blocks bots',
    body: 'Anonymous requests can’t get past its antibot protection. With a free API key, the request goes through our proxy and the page resolves.'
  },
  ERATE: {
    slug: 'rate-limit',
    title: 'Daily limit reached',
    body: `You’ve used today’s ${KEYLESS_REQUESTS_PER_DAY} anonymous requests. A free API key gives you ${FREE_PLAN_REQUESTS_PER_DAY} a day.`
  }
}

export const hasSignupPrompt = code => Object.hasOwn(PROMPTS, code)

export const SignupPrompt = ({ code, source, redirect }) => {
  const { slug, title, body } = PROMPTS[code]

  return (
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '520px'
      })}
    >
      <Text css={theme({ color: 'black', fontWeight: 'bold', fontSize: 3 })}>
        {title}
      </Text>
      <Text
        css={theme({
          pt: 2,
          fontSize: 2,
          color: 'black60',
          textWrap: 'balance'
        })}
      >
        {body}
      </Text>
      <SignupLink
        component={Button}
        forwardedAs='a'
        cta={`${source}:${slug}`}
        redirect={redirect}
        css={theme({
          mt: 4,
          px: 4,
          py: 3,
          fontSize: 1,
          borderRadius: 3,
          boxShadow: 2,
          whiteSpace: 'normal'
        })}
      >
        {ACTION_LABEL}
      </SignupLink>
      <Facts facts={FREE_KEY_FACTS} />
    </Flex>
  )
}
