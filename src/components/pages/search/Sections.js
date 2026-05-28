import React from 'react'
import {
  Check,
  CheckCircle,
  FileText,
  Search as SearchIcon,
  Zap
} from 'react-feather'
import { layout, theme } from 'theme'

import Box from 'components/elements/Box'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import FeatherIcon from 'components/icons/Feather'

import { BulletItem, TutorialStepContainer } from './'

const TUTORIAL_CODE_HEIGHT_BY_TITLE = {
  'Install and initialize': ['140px', '140px', '150px', '150px'],
  'Run the first query': ['200px', '200px', '220px', '220px']
}
const TUTORIAL_CODE_HEIGHT_DEFAULT = ['160px', '160px', '180px', '180px']

export const SectionCaption = ({ color, children, centered = false }) => (
  <Flex
    css={theme({
      alignItems: 'center',
      mb: 3,
      justifyContent: centered ? 'center' : 'flex-start'
    })}
  >
    <Flex
      as='span'
      css={theme({
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
        px: 3,
        py: 2,
        bg: 'white',
        border: 1,
        borderColor: color,
        borderRadius: 5
      })}
    >
      <Text
        as='span'
        css={theme({
          m: 0,
          color,
          fontWeight: 'bold',
          fontSize: [0, 0, 0, 0],
          textTransform: 'uppercase',
          letterSpacing: 2,
          lineHeight: 0
        })}
      >
        {children}
      </Text>
    </Flex>
  </Flex>
)

export const Bullet = ({ children }) => (
  <BulletItem>
    <FeatherIcon
      icon={CheckCircle}
      color='close'
      size={[1, 1, 2, 2]}
      css={theme({ flexShrink: 0, mr: 1, alignSelf: 'flex-start' })}
    />
    <Text
      as='span'
      css={theme({
        color: 'black80',
        fontSize: [0, 0, 1, 1],
        lineHeight: 2
      })}
    >
      {children}
    </Text>
  </BulletItem>
)

export const BulletList = ({ children }) => (
  <Box
    as='ul'
    css={theme({
      m: 0,
      mt: [3, 3, 4, 4],
      p: 0,
      listStyle: 'none'
    })}
  >
    {children}
  </Box>
)

export const PricingCheck = ({ children }) => (
  <Flex css={theme({ alignItems: 'center', pt: 2, gap: 2 })}>
    <Box
      css={theme({
        display: 'inline-flex',
        color: 'orange7',
        flexShrink: 0
      })}
    >
      <Check size={16} aria-hidden='true' />
    </Box>
    <Text as='span' css={theme({ fontSize: [0, 0, 1, 1], color: 'black90' })}>
      {children}
    </Text>
  </Flex>
)

const RETRIEVAL_ICONS = {
  markdown: FileText,
  bolt: Zap,
  search: SearchIcon
}

const RETRIEVAL_FEATURE_ACCENTS = {
  blue: {
    color: 'blue6',
    bg: 'blue0',
    borderColor: 'blue1'
  },
  teal: {
    color: 'teal7',
    bg: 'teal0',
    borderColor: 'teal1'
  }
}

export const RetrievalFeatureCard = ({
  icon,
  accent,
  title,
  description,
  ...props
}) => {
  const Icon = RETRIEVAL_ICONS[icon]
  const iconAccent = RETRIEVAL_FEATURE_ACCENTS[accent]

  return (
    <Flex
      css={theme({
        gap: [3, 3, 4, 5],
        alignItems: 'flex-start'
      })}
    >
      <Box
        css={theme({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: ['72px', '72px', '82px', '82px'],
          height: ['72px', '72px', '82px', '82px'],
          borderRadius: '50%',
          flexShrink: 0,
          border: 1,
          borderColor: iconAccent.borderColor,
          bg: iconAccent.bg,
          color: iconAccent.color,
          position: 'relative'
        })}
      >
        <Icon size={32} strokeWidth={2.25} aria-hidden='true' />
      </Box>
      <Box css={theme({ minWidth: 0, flex: 1 })} {...props}>
        <Text
          as='h3'
          css={theme({
            m: 0,
            color: 'black',
            fontWeight: 'bold',
            fontSize: [2, 2, 2, 2],
            lineHeight: 1,
            letterSpacing: 0
          })}
        >
          {title}
        </Text>
        <Text
          as='p'
          css={theme({
            m: 0,
            mt: 2,
            color: 'black70',
            fontSize: [1, 1, 1, 1],
            lineHeight: 3
          })}
        >
          {description}
        </Text>
      </Box>
    </Flex>
  )
}

const TutorialStepPanel = ({ panel, title }) => {
  if (panel.type === 'features') {
    return (
      <BulletList>
        {panel.items.map(item => (
          <Bullet key={item}>{item}</Bullet>
        ))}
      </BulletList>
    )
  }

  const panelWrapperCss = theme({
    mt: [3, 3, 4, 4],
    border: 1,
    borderColor: 'black10',
    borderRadius: 4,
    bg: 'white',
    overflow: 'hidden'
  })

  if (panel.type === 'terminal') {
    return (
      <Box css={panelWrapperCss}>
        <Text
          as='pre'
          css={theme({
            m: 0,
            p: [3, 3, 4, 4],
            bg: 'gray0',
            color: 'black80',
            fontFamily: 'mono',
            fontSize: [0, 0, 1, 1],
            lineHeight: 2,
            whiteSpace: 'pre-wrap'
          })}
        >
          {panel.content}
        </Text>
      </Box>
    )
  }

  return (
    <Box css={panelWrapperCss}>
      <CodeEditor
        language={panel.language}
        blinkCursor={false}
        showWindowButtons={false}
        showTitle={false}
        showAction={false}
        css={theme({
          width: '100%',
          height:
            TUTORIAL_CODE_HEIGHT_BY_TITLE[title] ??
            TUTORIAL_CODE_HEIGHT_DEFAULT,
          border: 0,
          borderRadius: 0
        })}
      >
        {panel.content}
      </CodeEditor>
    </Box>
  )
}

export const TutorialStep = ({ step }) => (
  <TutorialStepContainer>
    <Flex
      aria-hidden='true'
      css={theme({
        display: ['none', 'none', 'flex', 'flex'],
        position: 'relative',
        zIndex: 2,
        justifyContent: 'center'
      })}
    >
      <Box
        css={theme({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '44px',
          height: '44px',
          borderRadius: '9999px',
          bg: 'gray9',
          color: 'white',
          position: 'relative',
          zIndex: 1,
          fontWeight: 'bold',
          fontSize: 2
        })}
      >
        {step.step}
      </Box>
    </Flex>

    <Box css={theme({ minWidth: 0 })}>
      <Text
        as='p'
        css={theme({
          m: 0,
          display: ['block', 'block', 'none', 'none'],
          color: 'black50',
          fontFamily: 'mono',
          fontSize: [0, 0, 1, 1],
          fontWeight: 'bold',
          letterSpacing: 1
        })}
      >
        {step.step}
      </Text>
      <Text
        as='h3'
        css={theme({
          m: 0,
          mt: 2,
          color: 'black',
          fontWeight: 'bold',
          fontSize: [2, 2, 3, 3],
          lineHeight: 1
        })}
      >
        {step.title}
      </Text>
      <Text
        as='p'
        css={theme({
          m: 0,
          mt: 2,
          color: 'black70',
          fontSize: [1, 1, 2, 2],
          lineHeight: 2,
          maxWidth: ['100%', '100%', layout.normal, layout.normal]
        })}
      >
        {step.description}
      </Text>

      <TutorialStepPanel panel={step.panel} title={step.title} />
    </Box>
  </TutorialStepContainer>
)
