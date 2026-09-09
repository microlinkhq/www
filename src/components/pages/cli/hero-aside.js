import React from 'react'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import { space, theme } from 'theme'

import { HERO_FEATURES, INSTALL_SNIPPET } from './shared'

const HeroFeatureIcon = ({ children }) => (
  <Flex
    css={theme({
      width: space[4],
      height: space[4],
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      bg: 'red0',
      border: 1,
      borderColor: 'red2',
      borderRadius: 3
    })}
    aria-hidden='true'
  >
    {children}
  </Flex>
)

const HeroFeature = ({ icon, title, description }) => (
  <Flex
    as='li'
    css={theme({
      gap: 3,
      alignItems: 'flex-start',
      minWidth: 0
    })}
  >
    <HeroFeatureIcon>{icon}</HeroFeatureIcon>
    <Box css={theme({ minWidth: 0 })}>
      <Text
        as='h2'
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

export const HeroQuickStart = () => (
  <Box id='install' css={theme({ width: '100%', minWidth: 0 })}>
    <Caps
      css={theme({
        color: 'black80',
        fontWeight: 'bold',
        fontSize: 0,
        letterSpacing: 2,
        pb: 2
      })}
    >
      Quick start
    </Caps>
    <CodeEditor
      language='shell'
      autoHeight
      showFade={false}
      showTitle={false}
      blinkCursor
      css={theme({
        width: '100%',
        maxWidth: '100%'
      })}
      aria-label='Install Microlink CLI'
    >
      {INSTALL_SNIPPET}
    </CodeEditor>
  </Box>
)

export const HeroFeatures = () => (
  <Box
    as='ul'
    css={theme({
      gridArea: 'features',
      listStyle: 'none',
      m: 0,
      p: 0,
      minWidth: 0,
      maxWidth: ['100%', '100%', '520px', '540px'],
      mx: ['auto', 'auto', 0, 0],
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      width: '100%',
      textAlign: 'left'
    })}
  >
    {HERO_FEATURES.map(({ title, description, icon }) => (
      <HeroFeature
        key={title}
        icon={icon}
        title={title}
        description={description}
      />
    ))}
  </Box>
)
