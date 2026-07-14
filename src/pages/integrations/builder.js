import { borders, colors, gradient, layout, theme, transition } from 'theme'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'react-feather'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Meta from 'components/elements/Meta/Meta'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'

import Caption from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Layout from 'components/patterns/Layout'

import { useClipboard } from 'components/hook/use-clipboard'
import { Builder } from 'components/pages/builder'

const FRAMEWORKS = [
  'React',
  'TypeScript',
  'Vue',
  'Angular',
  'Svelte',
  'Astro',
  'Vanilla JS'
]

const STEPS = [
  {
    title: 'Design it',
    description:
      'Pick a size, place the image, set colors, fonts, border, and shadow. The preview updates as you go.'
  },
  {
    title: 'Copy it',
    description:
      'Grab a zero-dependency component for React, TypeScript, Vue, Angular, Svelte, Astro, or Vanilla JS — no SDK, no build step.'
  },
  {
    title: 'Ship it',
    description:
      'Drop it in, pass a url. It fetches metadata from the Microlink API itself. Add an apiKey for Pro.'
  }
]

// A copy-paste prompt for AI coding agents (Cursor, Claude Code, Copilot, …).
// It tells the model to interview the user, inspect the repo's styling, and
// only then generate a Microlink link-preview component tailored to the stack.
// Authored without backticks or ${} so it lives safely inside this template
// literal.
const AI_PROMPT = `You are an expert frontend engineer. Add a link preview component to THIS project — a component that takes a url and renders a rich preview card (image, title, description, favicon, site name) from the Microlink API.

Microlink API basics:
- Free: GET https://api.microlink.io/?url=THE_URL&palette=true
- Pro: GET https://pro.microlink.io/?url=THE_URL&palette=true with an "x-api-key" header
- The JSON response exposes data.title, data.description, data.url, data.publisher, data.author, data.date, data.image.url, data.logo.url and data.image.palette.

Do NOT write any code yet. First interview me and inspect this repository so the component matches my stack and design system exactly.

1. Detect my stack. Inspect package.json, config files, file extensions and existing components to infer the framework (React, Vue, Svelte, Angular, Astro, Solid or vanilla JS), the language (JavaScript or TypeScript) and the styling approach (Tailwind, CSS Modules, styled-components, Emotion, vanilla CSS, CSS variables, …). Tell me what you found and ask me to confirm. If you cannot tell, ask me — never assume.

2. Learn my design system. Read my theme/tokens, global styles, Tailwind or theme config and a few existing components to extract my color palette, font families and sizes, border radius, spacing scale, shadows and how I handle light/dark mode. Reuse my tokens and utility classes instead of hardcoding values. If the design language is ambiguous, show me 2-3 concrete options and ask which I prefer.

3. Confirm the details, one question at a time, waiting for my answer before moving on:
   - Which framework and language should the component be written in? (default: match the repo)
   - Which styling method should it use? (default: match the repo)
   - Layout: large image on top, horizontal (image beside the text) or compact?
   - Which fields to show: image, title, description, favicon, site name, author, date?
   - Light theme, dark theme or both?
   - Free Microlink API or Pro with an API key? If Pro, where should the key live — an env var, a prop or a server-side proxy?
   - Any loading and error states you want?

4. Implement it only after I have confirmed framework, language and styling. Generate a single, self-contained, dependency-free component that:
   - Accepts a required "url" prop and an optional "apiKey" prop.
   - Fetches metadata from Microlink, prepending "https://" to bare domains and warning once if it had to.
   - Renders the card using MY project's styling conventions and tokens — not generic styles.
   - Handles loading and failed requests gracefully (render a fallback or nothing; never crash).
   - Is accessible: the whole card is one link, images have alt text and the semantics are correct.
   - Comes with a short usage example.

5. Keep iterating. After generating it, ask me what to refine and adjust the layout, styling and props until the preview looks exactly how I want it inside my app.

Rule: whenever anything about my framework, language or design system is unclear, ask me a question instead of guessing.`

const QUESTIONS = [
  {
    question: 'What does the generated component depend on?',
    answer: (
      <>
        <div>
          Nothing. Each component is a single self-contained file with no npm
          dependencies. It calls the Microlink REST API directly with{' '}
          <code>fetch</code> and renders the card with inline styles, so there
          is no SDK to install, no CSS to import, and no build step to
          configure.
        </div>
      </>
    )
  },
  {
    question: 'Which frameworks can I export to?',
    answer: (
      <>
        <div>
          React, TypeScript, Vue, Angular, Svelte, Astro, and Vanilla JS. Pick a
          tab under the preview to see that framework&rsquo;s component, then
          copy it or download the file. The card markup and your design are
          identical across every target — only the framework wrapper changes.
        </div>
      </>
    )
  },
  {
    question: 'Can I edit the component after I copy it?',
    answer: (
      <>
        <div>
          Yes — it&rsquo;s plain source that you own. Your design is baked into
          a <code>STYLE</code> object at the top of the file, so you can tweak a
          single color or size by hand, or rework the markup entirely. Come back
          to the builder whenever you want to regenerate from scratch.
        </div>
      </>
    )
  },
  {
    question: 'Does it work with server-side rendering?',
    answer: (
      <>
        <div>
          The Astro component fetches on the server at render time, so the card
          ships as static HTML — crawlable, with zero client-side JavaScript.
          The React, Vue, Svelte, and Angular components run on the client and
          render the card as soon as the metadata resolves.
        </div>
      </>
    )
  },
  {
    question: 'Can I design separate light and dark themes?',
    answer: (
      <>
        <div>
          Under <strong>Colors</strong> you can switch between Light and Dark
          and tune every color independently — headline, description, metadata,
          background, and border. The generated component bakes the palette you
          designed, so it renders with exactly those colors wherever you drop it
          in.
        </div>
      </>
    )
  },
  {
    question: 'What happens if a URL is invalid or missing its protocol?',
    answer: (
      <>
        <div>
          If you pass a bare domain like <code>github.com</code>, the component
          prepends <code>https://</code> for you and logs a one-time console
          warning recommending you pass an explicit protocol. If the metadata
          cannot be fetched at all, the component renders nothing rather than
          breaking your layout.
        </div>
      </>
    )
  },
  {
    question: 'Is my design saved when I come back?',
    answer: (
      <>
        <div>
          Your settings are stored locally in your browser, so the builder
          reopens exactly where you left off — no account needed. Hit{' '}
          <strong>Reset</strong> anytime to restore every control to its
          defaults.
        </div>
      </>
    )
  },
  {
    question: 'How do free and Pro requests work?',
    answer: (
      <>
        <div>
          Without an <code>apiKey</code> the component queries{' '}
          <code>api.microlink.io</code> (free tier). Pass an <code>apiKey</code>{' '}
          prop and it switches to <code>pro.microlink.io</code> with your key,
          unlocking higher rate limits and Pro features. Both endpoints are the
          same <Link href='/link-preview'>Microlink link preview API</Link>.
        </div>
      </>
    )
  },
  {
    question: 'How does the Vanilla JS version work?',
    answer: (
      <>
        <div>
          It exposes a global <code>microlink(selector, options)</code> function
          that replaces every matched element with the card you designed — e.g.{' '}
          <code>microlink('a')</code> turns every link into a preview, and{' '}
          <code>
            microlink('.link-previews', {'{'} size: 'large' {'}'})
          </code>{' '}
          targets a class with options.
        </div>
      </>
    )
  },
  {
    question: 'How is this different from the SDK?',
    answer: (
      <>
        <div>
          The <Link href='/integrations/sdk'>SDK</Link> is a prebuilt,
          batteries-included component you install from npm. This builder
          generates source you own and can edit — handy when you want a specific
          look with zero dependencies. Either way, the component renders data
          from the <Link href='/link-preview'>link preview API</Link>.
        </div>
      </>
    )
  }
]

const Hero = () => (
  <Flex
    as='section'
    css={theme({ flexDirection: 'column', alignItems: 'center' })}
  >
    <Heading
      css={theme({
        mt: [3, 3, 0, 0],
        maxWidth: layout.large,
        textAlign: 'center'
      })}
    >
      Build your own <br /> link preview component
    </Heading>
    <Caption
      forwardedAs='h2'
      css={theme({ pt: [3, 3, 4, 4], px: 4, maxWidth: layout.large })}
    >
      Design a link preview card, then copy a zero-dependency component for{' '}
      {FRAMEWORKS.join(', ')}. It fetches metadata from the Microlink API itself
      — pass an apiKey to go Pro.
    </Caption>
  </Flex>
)

// No maxWidth clamp, and no horizontal padding at the rail breakpoint: the
// Builder centers its own single-column content, and its settings rail docks
// flush to the page's left edge (so its pinned/parked states line up exactly).
const BuilderSection = () => (
  <Box
    as='section'
    id='builder'
    css={theme({
      pt: [4, 4, 5, 5],
      mb: [4, 4, 5, 5],
      px: [3, 3, 4, 0]
    })}
  >
    <Builder />
  </Box>
)

const Eyebrow = styled(Caps)`
  ${theme({
    fontSize: 0,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: 'black40'
  })}
  display: block;
  text-align: center;
`

const StepsRow = styled(Flex)`
  ${theme({
    pt: [4, 4, 5, 5],
    gap: [3, 3, 4, 4],
    flexDirection: ['column', 'column', 'row', 'row'],
    alignItems: 'stretch'
  })}
  width: 100%;
  justify-content: center;
`

const StepCard = styled(Flex)`
  ${theme({ p: [3, 4, 4, 4], borderRadius: '16px' })}
  position: relative;
  flex-direction: column;
  flex: 1 1 0;
  max-width: 400px;
  margin: 0 auto;
  background: ${colors.white};
  border: 1px solid ${colors.black10};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform ${transition.medium}, box-shadow ${transition.medium},
    border-color ${transition.medium};

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(192, 63, 162, 0.35);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05),
      0 18px 44px rgba(140, 27, 171, 0.12);
  }
`

const StepBadge = styled(Flex)`
  ${theme({ fontFamily: 'mono', fontSize: 2, fontWeight: 'bold' })}
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  color: ${colors.white};
  background: ${gradient};
  box-shadow: 0 6px 16px rgba(140, 27, 171, 0.28);
`

const HowItWorks = () => (
  <Container
    as='section'
    id='how-it-works'
    css={theme({
      alignItems: 'center',
      maxWidth: layout.large,
      py: [4, 4, 5, 5],
      px: [3, 3, 4, 4]
    })}
  >
    <Eyebrow>How it works</Eyebrow>
    <Subhead variant='gradient' css={theme({ pt: 2, textAlign: 'center' })}>
      Three steps to ship
    </Subhead>
    <Text
      css={theme({
        pt: [3, 3, 3, 3],
        maxWidth: '520px',
        textAlign: 'center',
        fontSize: [1, 1, 2, 2],
        color: 'black60'
      })}
    >
      Design a card, copy the component for your framework, and drop it into
      your app. Each one calls the{' '}
      <Link href='/link-preview'>link preview API</Link> directly — no SDK and
      no build step in between.
    </Text>
    <StepsRow>
      {STEPS.map(({ title, description }, index) => (
        <StepCard key={title}>
          <StepBadge>{`0${index + 1}`}</StepBadge>
          <Subhead css={theme({ pt: 3, textAlign: 'left' })}>{title}</Subhead>
          <Text
            css={theme({
              pt: 2,
              fontSize: [0, 0, 1, 1],
              color: 'black60',
              lineHeight: 2
            })}
          >
            {description}
          </Text>
        </StepCard>
      ))}
    </StepsRow>
  </Container>
)

/* ─── AI prompt section ───────────────────────────────────────────────────── */

const PromptCard = styled(Box)`
  ${theme({ borderRadius: '16px' })}
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  background: ${colors.white};
  border: 1px solid ${colors.black10};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`

const PromptHeader = styled(Flex)`
  ${theme({ px: [3, 4, 4, 4], py: 3 })}
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.black05};
`

const PromptBody = styled(Box).attrs({ as: 'pre' })`
  ${theme({
    fontFamily: 'mono',
    fontSize: [0, 0, 1, 1],
    px: [3, 4, 4, 4],
    py: [3, 4, 4, 4]
  })}
  margin: 0;
  max-height: 460px;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.7;
  color: ${colors.black80};
`

const CopyButton = styled(Box).attrs({ as: 'button', type: 'button' })`
  ${theme({
    fontFamily: 'sans',
    fontSize: 0,
    fontWeight: 'bold',
    px: 3,
    py: 2,
    borderRadius: '8px'
  })}
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  color: ${colors.white};
  background: ${colors.link};
  transition: opacity ${transition.short};

  &:hover {
    opacity: 0.85;
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.link};
    outline-offset: 2px;
  }
`

const PromptSection = () => {
  const [ClipboardComponent, toClipboard] = useClipboard()
  const [copied, setCopied] = useState(false)
  const timerRef = useRef(null)

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    []
  )

  const handleCopy = useCallback(() => {
    if (!toClipboard({ copy: AI_PROMPT, text: 'Prompt copied to clipboard' })) {
      return
    }
    setCopied(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setCopied(false), 1500)
  }, [toClipboard])

  return (
    <Container
      as='section'
      id='ai-prompt'
      css={theme({
        alignItems: 'center',
        maxWidth: layout.large,
        py: [5, 5, 6, 6],
        px: [3, 3, 4, 4]
      })}
    >
      <Eyebrow>Use your AI coding agent</Eyebrow>
      <Subhead variant='gradient' css={theme({ pt: 2, textAlign: 'center' })}>
        Generate it with a prompt
      </Subhead>
      <Text
        css={theme({
          pt: [3, 3, 3, 3],
          maxWidth: '600px',
          textAlign: 'center',
          fontSize: [1, 1, 2, 2],
          color: 'black60'
        })}
      >
        Prefer to stay in your editor? Paste this prompt into Cursor, Claude
        Code, Copilot, or any LLM. It interviews you, inspects your repo&rsquo;s
        styling, and builds a Microlink preview component tailored to your
        stack.
      </Text>
      <PromptCard css={theme({ mt: [4, 4, 5, 5] })}>
        <PromptHeader>
          <Caps
            css={theme({
              fontSize: 0,
              fontWeight: 'bold',
              color: 'black60',
              letterSpacing: 1
            })}
          >
            Prompt
          </Caps>
          <CopyButton
            onClick={handleCopy}
            aria-label={copied ? 'Prompt copied' : 'Copy prompt to clipboard'}
            aria-live='polite'
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy prompt'}</span>
          </CopyButton>
        </PromptHeader>
        <PromptBody>{AI_PROMPT}</PromptBody>
      </PromptCard>
      <ClipboardComponent />
    </Container>
  )
}

const BuilderPage = () => (
  <Layout>
    <Hero />
    <BuilderSection />
    <Box
      css={theme({
        bg: 'pinky',
        borderTop: 1,
        borderTopColor: 'black10',
        borderBottom: 1,
        borderBottomColor: 'black10'
      })}
    >
      <HowItWorks />
    </Box>
    <PromptSection />
    <Box
      css={theme({
        bg: 'pinky',
        borderTop: 1,
        borderTopColor: 'black10'
      })}
    >
      <Faq
        css={theme({ py: [5, 5, 6, 6] })}
        title='FAQ'
        questions={QUESTIONS}
      />
    </Box>
  </Layout>
)

export const Head = () => (
  <Meta
    title='Link Preview Component Builder — React, Vue, Svelte, Astro & TS'
    description='Visually design a link preview card, then copy or download a zero-dependency component for React, TypeScript, Vue, Angular, Svelte, Astro, and Vanilla JS. Fetches metadata from the Microlink API; pass an apiKey for Pro.'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/integrations/builder',
        name: 'Microlink Link Preview Component Builder',
        description:
          'Visually design a link preview card and generate a zero-dependency component for React, TypeScript, Vue, Angular, Svelte, Astro, and Vanilla JS.',
        url: 'https://microlink.io/integrations/builder',
        applicationCategory: 'DeveloperApplication',
        keywords: [
          'link preview component',
          'link preview generator',
          'react link preview',
          'typescript link preview',
          'vue link preview',
          'angular link preview',
          'svelte link preview',
          'astro link preview',
          'vanilla js link preview',
          'unfurl url',
          'microlink'
        ],
        provider: {
          '@type': 'Organization',
          '@id': 'https://microlink.io/about',
          name: 'Microlink',
          url: 'https://microlink.io'
        }
      }
    ]}
  />
)

export default BuilderPage
