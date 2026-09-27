import React from 'react'

import { Link } from 'components/elements/Link'
import { AgentNames, FAQ_AGENTS } from './agent-names'

export const FAQ_ITEMS = [
  {
    question: 'What is the Microlink skill?',
    text: 'The entry point for using Microlink from an AI agent. One skill covers every product: screenshots, PDFs, markdown, metadata, scraping, search, and browser functions. It opens API or MCP details when it needs them. You install this skill, not the companions.',
    answer: (
      <>
        <div>
          The entry point for using Microlink from an AI agent. One skill covers
          every product: screenshots, PDFs, markdown, metadata, scraping,
          search, and browser functions.
        </div>
        <div>
          It opens API or MCP details when it needs them. You install this
          skill, not the companions. Read it at{' '}
          <Link href='/skills/microlink'>/skills/microlink</Link>.
        </div>
      </>
    )
  },
  {
    question: 'Do I also need MCP?',
    text: 'No. Do not pick skill versus MCP. The Microlink skill is the umbrella. When this session must run a product in chat, the skill installs the MCP server itself.',
    answer: (
      <>
        <div>
          No. Do not pick skill versus MCP. The Microlink skill is the umbrella.
        </div>
        <div>
          When this session must run a product in chat (screenshot this URL,
          markdown that page), the skill installs the MCP server itself. When
          you want code, CLI, or HTTP in your app, it writes that from the same
          skill.
        </div>
      </>
    )
  },
  {
    question: 'Which agents work?',
    text: 'Any agent that can load a SKILL.md playbook: Claude Code, Cursor, ChatGPT, and others that speak the same install command. Paste the prompt. The agent installs the skill.',
    answer: (
      <>
        <div>
          Any agent that can load a SKILL.md playbook:{' '}
          <AgentNames agents={FAQ_AGENTS} />, and others that speak the same
          install command.
        </div>
        <div>Paste the prompt. The agent installs the skill.</div>
      </>
    )
  },
  {
    question: 'Do I need an API key?',
    text: 'Not to start. The free plan is 25 requests per day with no key and no credit card. Every product except Search is available on the free tier. A Pro key unlocks Search, higher quota, proxy, custom headers, and configurable TTL.',
    answer: (
      <>
        <div>
          Not to start. The free plan is 25 requests per day with no key and no
          credit card. Every product except Search is available on the free
          tier.
        </div>
        <div>
          A <Link href='/pricing'>Pro</Link> key unlocks{' '}
          <Link href='/search'>Search</Link>, higher quota,{' '}
          <Link href='/features/proxy'>proxy</Link>,{' '}
          <Link href='/features/headers'>custom headers</Link>, and{' '}
          <Link href='/features/ttl'>configurable TTL</Link>.
        </div>
      </>
    )
  },
  {
    question: 'What can my agent do after it installs the skill?',
    text: 'Screenshot any URL, generate a PDF, convert a page to markdown or HTML, pull normalized metadata and logos, scrape custom fields, extract video and audio, collect links and emails, run a Lighthouse audit, detect a site’s tech stack, search Google as structured data, and run custom JavaScript in a browser sandbox.',
    answer: (
      <>
        <div>
          Screenshot any URL, generate a PDF, convert a page to{' '}
          <Link href='/markdown'>markdown</Link> or{' '}
          <Link href='/html'>HTML</Link>, pull normalized{' '}
          <Link href='/metadata'>metadata</Link> and logos, scrape custom
          fields, extract <Link href='/media'>video and audio</Link>, collect
          links and emails, run a Lighthouse audit, detect a site’s tech stack,{' '}
          <Link href='/search'>search Google</Link> as structured data, and run
          custom JavaScript in a <Link href='/function'>browser sandbox</Link>.
        </div>
        <div>Ask in chat. The skill routes the call.</div>
      </>
    )
  },
  {
    question: 'Where are the other Microlink skills?',
    text: 'You do not need them as separate installs. The Microlink skill opens microlink-api or microlink-mcp when those details are needed. Browse the directory if you want the rest of the catalog.',
    answer: (
      <>
        <div>
          You do not need them as separate installs. The Microlink skill opens
          those files when it needs query-string details or MCP internals.
        </div>
        <div>
          Browse the <Link href='/skills'>skills directory</Link> if you want
          the rest of the catalog.
        </div>
      </>
    )
  }
]
