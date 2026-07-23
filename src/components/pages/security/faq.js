import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import { Link } from 'components/elements/Link'

import { CodeInline } from 'components/markdown/CodeInline'

import Faq from 'components/patterns/Faq/Faq'
import {
  SECTION_MAX_WIDTH,
  SECTION_PX,
  SECTION_PY
} from 'components/patterns/FeatureStory'

export const FAQ_ITEMS = [
  {
    question: 'Does every request really get its own browser?',
    text: 'Yes. Each request is assigned its own incognito browser context, created when the request starts and destroyed when it finishes — on success, timeout, or client disconnect. Contexts are never shared or reused across requests, so cookies, caches, profiles, and session state cannot leak between them.',
    answer: (
      <>
        <div>
          Yes. Each request is assigned its own incognito browser context,
          created when the request starts and destroyed when it finishes — on
          success, timeout, or client disconnect.
        </div>
        <div>
          Contexts are never shared or reused across requests, so cookies,
          caches, profiles, and session state cannot leak between them.
        </div>
      </>
    )
  },
  {
    question: 'How does Microlink prevent SSRF?',
    text: 'At two layers. Before the fetch, the hostname is resolved via DNS and refused with EFORBIDDENURL if it points at a reserved range — loopback, private networks, link-local, or cloud metadata endpoints — with redirects re-checked hop by hop. During rendering, a Chromium request interceptor validates every origin the page touches and aborts the request if it navigates into a reserved range mid-render.',
    answer: (
      <>
        <div>
          At two layers. Before the fetch, the hostname is resolved via DNS and
          refused with <CodeInline>EFORBIDDENURL</CodeInline> if it points at a
          reserved range — loopback, private networks, link-local, or cloud
          metadata endpoints — with redirects re-checked hop by hop.
        </div>
        <div>
          During rendering, a Chromium request interceptor validates every
          origin the page touches and aborts the request if it navigates into a
          reserved range mid-render.
        </div>
      </>
    )
  },
  {
    question: 'Are cookies, cache, or sessions shared between requests?',
    text: 'No. All browser state lives inside the request’s own incognito context and is destroyed with it. Cached API responses are keyed by SHA-512 hashes that incorporate the headers a request was made with, so a response fetched with your credentials is never served to a request without them.',
    answer: (
      <>
        <div>
          No. All browser state lives inside the request&rsquo;s own incognito
          context and is destroyed with it.
        </div>
        <div>
          Cached API responses are keyed by SHA-512 hashes that incorporate the
          headers a request was made with, so a response fetched with your
          credentials is never served to a request without them.
        </div>
      </>
    )
  },
  {
    question: 'What limits apply to user-supplied code?',
    text: 'Code passed through the function parameter runs inside a VM with an execution timeout and a memory ceiling. On the free plan, code size is capped and cross-origin fetch, XHR, and WebSocket calls are blocked. Every request, with or without code, is subject to hard time limits and concurrency caps.',
    answer: (
      <>
        <div>
          Code passed through the <CodeInline>function</CodeInline> parameter
          runs inside a VM with an execution timeout and a memory ceiling. On
          the free plan, code size is capped and cross-origin{' '}
          <CodeInline>fetch</CodeInline>, <CodeInline>xhr</CodeInline>, and{' '}
          <CodeInline>websocket</CodeInline> calls are blocked.
        </div>
        <div>
          Every request, with or without code, is subject to hard time limits
          and concurrency caps — see{' '}
          <Link href='/features/function'>browser functions</Link> for the full
          execution model.
        </div>
      </>
    )
  },
  {
    question: 'What additional security does Enterprise provide?',
    text: 'Microlink Enterprise runs the full API on hardware that serves only you: a dedicated endpoint backed by an isolated pool of always-ready browsers, deployable in 8 locations, with a 99.9% uptime SLA. Your content is never used to train AI models, and it is deleted within 60 days of your request, backed by a GDPR-compliant Data Processing Agreement.',
    answer: (
      <>
        <div>
          <Link href='/enterprise'>Microlink Enterprise</Link> runs the full API
          on hardware that serves only you: a dedicated endpoint backed by an
          isolated pool of always-ready browsers, deployable in
          8&nbsp;locations, with a 99.9% uptime SLA.
        </div>
        <div>
          Your content is never used to train AI models, and it is deleted
          within 60&nbsp;days of your request — backed by a GDPR-compliant{' '}
          <Link href='/dpa'>Data Processing Agreement</Link>.
        </div>
      </>
    )
  },
  {
    question: 'Where can I read about compliance and data processing?',
    text: 'The security practices page covers infrastructure security, encryption, monitoring, and GDPR compliance. The Data Processing Agreement, subprocessors list, and privacy policy cover the legal side. For vulnerability reports, email hello@microlink.io with the subject "Security Inquiry".',
    answer: (
      <>
        <div>
          The <Link href='/security'>security practices</Link> page covers
          infrastructure security, encryption, monitoring, and GDPR compliance.
          The <Link href='/dpa'>Data Processing Agreement</Link>,{' '}
          <Link href='/subprocessors'>subprocessors list</Link>, and{' '}
          <Link href='/privacy'>privacy policy</Link> cover the legal side.
        </div>
        <div>
          For vulnerability reports, email{' '}
          <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link> with
          the subject &ldquo;Security Inquiry&rdquo;.
        </div>
      </>
    )
  }
]

export const FaqSection = () => (
  <Box
    css={theme({
      bg: 'pinky',
      borderTop: 1,
      borderTopColor: 'pinkest',
      width: '100%'
    })}
  >
    <Box css={theme({ maxWidth: SECTION_MAX_WIDTH, mx: 'auto' })}>
      <Faq
        css={theme({
          py: SECTION_PY,
          px: SECTION_PX
        })}
        questions={FAQ_ITEMS}
      />
    </Box>
  </Box>
)
