import React from 'react'
import styled from 'styled-components'
import { shadows, theme } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import ArrowLink from 'components/patterns/ArrowLink'
import Microlink from 'components/patterns/Microlink/Microlink'
import { HERO_LAYOUT } from '../shared'
import { ApiBar } from './api-bar'
import { BrandRow } from './palette'
import { SourcesRow } from './sources'

const HeroMicrolink = styled(Microlink)`
  --microlink-max-width: 100%;
  --microlink-hover-background-color: white;
  width: 100%;
  max-width: 100%;
`

export const CapabilitiesPreview = ({
  currentUrl,
  currentData,
  palette,
  logoUrl,
  capCopied,
  handleCapCopy
}) => (
  <Flex
    css={theme({
      width: ['100%', '100%', '100%', HERO_LAYOUT.mainWidth],
      pt: [4, 4, 5, 0],
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: [3, 3, 4, 4]
    })}
  >
    <Box
      css={theme({
        width: ['100%', '100%', '80%', '100%'],
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: `${shadows[3]}`,
        bg: 'white'
      })}
    >
      <Box css={theme({ p: [3, 3, 4, 4], bg: 'white' })}>
        <HeroMicrolink
          key={currentUrl}
          size='large'
          url={(currentData && currentData.url) || currentUrl}
          fetchData={!currentData}
          setData={currentData ? () => currentData : undefined}
          media={['image', 'logo']}
        />
        {(palette.length > 0 || logoUrl) && (
          <BrandRow palette={palette} logoUrl={logoUrl} />
        )}
        <SourcesRow />
      </Box>
      <ApiBar
        currentUrl={currentUrl}
        capCopied={capCopied}
        handleCapCopy={handleCapCopy}
      />
    </Box>
    <ArrowLink css={theme({ fontSize: [1, 1, 2, 2] })} href='/integrations/sdk'>
      Drop-in link previews in one line of code
    </ArrowLink>
  </Flex>
)
