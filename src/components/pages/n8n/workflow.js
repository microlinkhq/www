import React from 'react'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'
import ArrowLink from 'components/patterns/ArrowLink'
import { HOME_CONTENT_WIDTH } from 'components/pages/home/catalog'

import {
  ACCENT_CHIP,
  DOCS_URL,
  INSTALL_STEPS,
  RESPONSE_MODES,
  REPOSITORY_URL,
  Section,
  SectionHeader,
  WORKFLOW_SNIPPET
} from 'components/pages/n8n/shared'

import { theme } from 'theme'

const StepNumber = ({ children }) => (
  <Flex
    css={theme({
      width: '28px',
      height: '28px',
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      bg: ACCENT_CHIP.bg,
      border: 1,
      borderColor: ACCENT_CHIP.border,
      borderRadius: 3,
      color: ACCENT_CHIP.icon,
      fontFamily: 'mono',
      fontSize: 0,
      fontWeight: 'bold'
    })}
    aria-hidden='true'
  >
    {children}
  </Flex>
)

const Step = ({ index, title, description }) => (
  <Flex
    as='li'
    css={theme({
      gap: 3,
      alignItems: 'flex-start',
      minWidth: 0
    })}
  >
    <StepNumber>{index}</StepNumber>
    <Box css={theme({ minWidth: 0 })}>
      <Text
        as='h3'
        css={theme({
          m: 0,
          color: 'black',
          fontSize: [1, 1, 2, 2],
          fontWeight: 'bold',
          lineHeight: 1.2
        })}
      >
        {title}
      </Text>
      <Text
        css={theme({
          m: 0,
          mt: 1,
          color: 'black80',
          fontSize: [0, 0, 1, 1],
          lineHeight: 2
        })}
      >
        {description}
      </Text>
    </Box>
  </Flex>
)

const NodePanel = () => (
  <Box css={theme({ width: '100%', minWidth: 0 })}>
    <Caps
      css={theme({
        color: 'black50',
        fontWeight: 'bold',
        fontSize: 0,
        letterSpacing: 2,
        pb: 2
      })}
    >
      Node panel
    </Caps>
    <CodeEditor
      language='text'
      autoHeight
      showFade={false}
      showTitle={false}
      css={theme({ width: '100%', maxWidth: '100%', textAlign: 'left' })}
      aria-label='Microlink node configured to capture a full page screenshot'
    >
      {WORKFLOW_SNIPPET}
    </CodeEditor>
    <Text
      css={theme({
        m: 0,
        pt: 3,
        color: 'black60',
        fontSize: 0,
        lineHeight: 2
      })}
    >
      That node returns a full page PNG as binary data, captured once the
      network goes quiet and with ads blocked. Fifty-eight options map one to
      one onto <Link href={DOCS_URL}>Microlink API parameters</Link>, and
      Additional Query Parameters takes any that are not on the list.
    </Text>
  </Box>
)

const ResponseMode = ({ name, description }) => (
  <Box
    as='li'
    css={theme({
      listStyle: 'none',
      borderLeft: 2,
      borderLeftColor: ACCENT_CHIP.border,
      pl: 3,
      minWidth: 0
    })}
  >
    <Text
      as='h3'
      css={theme({
        m: 0,
        fontFamily: 'mono',
        fontSize: 0,
        fontWeight: 'bold',
        color: 'black80'
      })}
    >
      {name}
    </Text>
    <Text
      css={theme({
        m: 0,
        mt: 1,
        color: 'black60',
        fontSize: 0,
        lineHeight: 2
      })}
    >
      {description}
    </Text>
  </Box>
)

const Workflow = () => (
  <Section id='workflow'>
    <SectionHeader
      title='Three clicks to the first run.'
      caption='The node is installed from inside n8n, not from a terminal. Nothing else to host, and no browser to keep alive.'
    />
    <Box
      css={theme({
        display: 'grid',
        gridTemplateColumns: [
          'minmax(0, 1fr)',
          'minmax(0, 1fr)',
          'minmax(0, 1fr) minmax(0, 1fr)',
          'minmax(0, 1fr) minmax(0, 1fr)'
        ],
        gap: [4, 4, 5, 5],
        alignItems: 'start',
        maxWidth: HOME_CONTENT_WIDTH,
        mx: 'auto',
        mt: [4, 4, 5, 5],
        width: '100%',
        textAlign: 'left'
      })}
    >
      <Box
        as='ol'
        css={theme({
          display: 'grid',
          gap: [3, 3, 4, 4],
          listStyle: 'none',
          m: 0,
          p: 0,
          minWidth: 0
        })}
      >
        {INSTALL_STEPS.map(({ title, description }, index) => (
          <Step
            key={title}
            index={index + 1}
            title={title}
            description={description}
          />
        ))}
      </Box>
      <NodePanel />
    </Box>
    <Box
      css={theme({
        maxWidth: HOME_CONTENT_WIDTH,
        mx: 'auto',
        pt: [4, 4, 5, 5],
        width: '100%',
        textAlign: 'left'
      })}
    >
      <Caps
        css={theme({
          color: 'black50',
          fontWeight: 'bold',
          fontSize: 0,
          letterSpacing: 2
        })}
      >
        Response modes
      </Caps>
      <Box
        as='ul'
        css={theme({
          display: 'grid',
          gridTemplateColumns: [
            'minmax(0, 1fr)',
            'minmax(0, 1fr) minmax(0, 1fr)',
            'repeat(4, minmax(0, 1fr))',
            'repeat(4, minmax(0, 1fr))'
          ],
          gap: [3, 3, 4, 4],
          mt: 3,
          mb: 0,
          px: 0,
          py: 0,
          width: '100%'
        })}
      >
        {RESPONSE_MODES.map(({ name, description }) => (
          <ResponseMode key={name} name={name} description={description} />
        ))}
      </Box>
    </Box>
    <Flex
      css={theme({
        pt: [4, 4, 5, 5],
        justifyContent: 'center',
        fontSize: [2, 2, 3, 3]
      })}
    >
      <ArrowLink css={theme({ pr: [2, 4, 4, 4] })} href={DOCS_URL}>
        Read the API docs
      </ArrowLink>
      <ArrowLink href={REPOSITORY_URL}>View the node source</ArrowLink>
    </Flex>
  </Section>
)

export default Workflow
