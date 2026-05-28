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
import Terminal from 'components/elements/Terminal/Terminal'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import FeatherIcon from 'components/icons/Feather'

import { BulletItem, TutorialStepContainer } from './'

export const SectionCaption = ({
  bg = 'white',
  color,
  children,
  centered = false
}) => (
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
        bg,
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
          fontSize: ['10px', '10px', '12px', '12px'],
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
      mt: 4,
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
        alignItems: 'flex-start',
        minWidth: 0,
        width: '100%',
        pr: [3, 3, 0, 0]
      })}
    >
      <Box
        css={theme({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: ['44px', '44px', '82px', '82px'],
          height: ['44px', '44px', '82px', '82px'],
          borderRadius: '50%',
          flexShrink: 0,
          border: 1,
          borderColor: iconAccent.borderColor,
          bg: iconAccent.bg,
          color: iconAccent.color,
          position: 'relative'
        })}
      >
        <Box
          css={theme({
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& svg': {
              width: ['18px', '18px', '32px', '32px'],
              height: ['18px', '18px', '32px', '32px']
            }
          })}
        >
          <Icon size={32} strokeWidth={2.25} aria-hidden='true' />
        </Box>
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
            lineHeight: 3,
            overflowWrap: 'break-word'
          })}
        >
          {description}
        </Text>
      </Box>
    </Flex>
  )
}

const TutorialStepPanel = ({ panel }) => {
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

  if (panel.language === 'bash') {
    return (
      <Box css={panelWrapperCss}>
        <Terminal
          css={theme({
            width: '100%',
            border: 0,
            borderRadius: 0
          })}
        >
          {panel.content}
        </Terminal>
      </Box>
    )
  }

  return (
    <Box css={panelWrapperCss}>
      <CodeEditor
        language={panel.language}
        showWindowButtons={false}
        css={theme({
          width: '100%',
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
    <Box
      aria-hidden='true'
      css={theme({
        display: ['none', 'none', 'block', 'block'],
        position: 'relative',
        zIndex: 2,
        textAlign: 'center'
      })}
    >
      <Text
        as='span'
        css={theme({
          display: 'inline-block',
          width: '44px',
          height: '44px',
          lineHeight: '44px',
          borderRadius: '50%',
          bg: 'gray9',
          color: 'white',
          fontWeight: 'bold',
          fontSize: 2
        })}
      >
        {step.step}
      </Text>
    </Box>

    <Box css={theme({ minWidth: 0 })}>
      <Text
        as='h3'
        css={theme({
          pb: [3, 3, 0, 0],
          m: 0,
          color: 'black',
          fontWeight: 'bold',
          fontSize: [2, 2, 3, 3],
          lineHeight: 1
        })}
      >
        <Text
          as='span'
          css={theme({
            display: ['inline', 'inline', 'none', 'none'],
            color: 'black50',
            fontFamily: 'mono',
            fontSize: [0, 0, 1, 1],
            fontWeight: 'bold',
            letterSpacing: 1,
            mr: [1, 1, 0, 0]
          })}
        >
          {step.step}.
        </Text>
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

      <TutorialStepPanel panel={step.panel} />
    </Box>
  </TutorialStepContainer>
)
