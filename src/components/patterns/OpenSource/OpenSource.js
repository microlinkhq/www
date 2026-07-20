import React from 'react'
import styled from 'styled-components'
import { Star as StarIcon } from 'react-feather'

import {
  theme,
  borders,
  colors,
  fontSizes,
  layout,
  radii,
  shadows,
  shadowInk,
  textGradient,
  transition,
  SECTION_VERTICAL_SPACING
} from 'theme'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import Caption from 'components/patterns/Caption/Caption'

import ossData from '../../../../data/oss.json'

const LAYOUT = {
  maxWidth: ['100%', '100%', '100%', `calc(${layout.large} * 1.7)`],
  mainWidth: '55%',
  secondaryWidth: '45%',
  gap: [3, 3, 4, 5]
}

const COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1
})

const formatCompactCount = number =>
  COMPACT_NUMBER_FORMATTER.format(number).toLowerCase()

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  TypeScript: '#3178c6'
}

const TILE_PALETTE = [
  { bg: colors.violet0, color: colors.violet7 },
  { bg: colors.pink0, color: colors.pink6 },
  { bg: colors.blue0, color: colors.blue7 },
  { bg: colors.orange0, color: colors.orange6 },
  { bg: colors.teal0, color: colors.teal7 },
  { bg: colors.green0, color: colors.green8 }
]

const REPO_TILES = {
  metascraper: TILE_PALETTE[0],
  browserless: TILE_PALETTE[1],
  sdk: TILE_PALETTE[2],
  cards: TILE_PALETTE[3],
  'html-get': TILE_PALETTE[4],
  unavatar: TILE_PALETTE[5]
}

const repoTile = (repo, index) =>
  REPO_TILES[repo.name] ?? TILE_PALETTE[index % TILE_PALETTE.length]

const REPOS_BY_NAME = new Map(ossData.map(repo => [repo.name, repo]))

export const getRepoStars = name => REPOS_BY_NAME.get(name)?.stars

export const OSS_STATS = {
  repos: ossData.length,
  stars: formatCompactCount(
    ossData.reduce((total, { stars }) => total + stars, 0)
  )
}

const CARD_HOVER_SHADOW = `0 22px 46px -28px rgba(${shadowInk}, 0.35)`

const Arrow = styled('svg')`
  width: 19px;
  height: 19px;
  flex-shrink: 0;
  color: ${colors.gray4};
  transition: color ${transition.medium}, transform ${transition.medium};
`

const RepoCard = styled('a')`
  ${theme({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    p: 3,
    bg: 'white',
    border: 1,
    borderColor: 'gray2',
    borderRadius: 5,
    color: 'black'
  })};
  text-decoration: none;
  box-shadow: ${shadows[2]};
  transition: border-color ${transition.medium}, box-shadow ${transition.medium},
    transform ${transition.medium};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: ${({ $accent }) => $accent};
      transform: translateY(-3px);
      box-shadow: ${CARD_HOVER_SHADOW};
    }
    &:hover ${Arrow} {
      color: ${colors.black};
      transform: translate(2px, -2px);
    }
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.link};
    outline-offset: ${radii[1]};
  }
`

const IconTile = styled(Flex)`
  ${theme({
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  })};
  background: ${({ $tile }) => $tile.bg};
  color: ${({ $tile }) => $tile.color};
`

const RepoMeta = styled(Flex)`
  ${theme({
    alignItems: 'center',
    gap: 3,
    fontSize: 0,
    fontFamily: 'sans',
    color: 'black60'
  })};
`

const LanguageDot = styled('span')`
  ${theme({ width: fontSizes[0], height: fontSizes[0] })};
  background: ${({ $color }) => $color};
  border-radius: 50%;
  flex-shrink: 0;
`

const GithubIcon = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 16 16'
    fill='currentColor'
    aria-hidden='true'
  >
    <path d='M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z' />
  </svg>
)

const arrowPaths = (
  <>
    <path d='M14 4h6v6M20 4l-8.5 8.5' />
    <path d='M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5' />
  </>
)

const RepoCardItem = ({ repo, tile, primary, ...props }) => (
  <RepoCard
    href={repo.url}
    target='_blank'
    rel='noopener noreferrer'
    $accent={tile.color}
    {...props}
  >
    <Flex
      css={theme({ alignItems: 'flex-start', justifyContent: 'space-between' })}
    >
      <Flex css={theme({ gap: 3, alignItems: 'flex-start' })}>
        <IconTile
          $tile={tile}
          css={theme({
            width: primary ? '52px' : '44px',
            height: primary ? '52px' : '44px'
          })}
        >
          <GithubIcon size={primary ? 24 : 20} />
        </IconTile>
        <Box>
          <Text
            as='h3'
            css={theme({
              fontWeight: 'bold',
              fontSize: primary ? [2, 2, 3, 3] : 2,
              lineHeight: 0,
              color: 'black'
            })}
          >
            {repo.name}
          </Text>
          <Text
            as='p'
            css={theme({
              fontSize: primary ? [1, 1, 2, 2] : 1,
              lineHeight: 1,
              mt: 2,
              color: 'black70'
            })}
          >
            {repo.description}
          </Text>
        </Box>
      </Flex>
      <Arrow
        aria-hidden='true'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.9'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        {arrowPaths}
      </Arrow>
    </Flex>
    <RepoMeta css={theme({ mt: 'auto', pt: 3, fontSize: primary ? 1 : 0 })}>
      <Flex css={theme({ alignItems: 'center', gap: 1 })}>
        <LanguageDot
          $color={LANGUAGE_COLORS[repo.language] ?? colors.black20}
        />
        {repo.language}
      </Flex>
      <Flex css={theme({ alignItems: 'center', gap: 1 })}>
        <StarIcon size={primary ? 16 : 14} aria-hidden='true' />
        {formatCompactCount(repo.stars)}
      </Flex>
    </RepoMeta>
  </RepoCard>
)

const OpenSource = ({
  repos,
  accent,
  caption,
  ctaHref = 'https://github.com/microlinkhq',
  ctaLabel = 'Explore on GitHub',
  ...props
}) => {
  const [primary, ...secondary] = repos.flatMap(
    name => REPOS_BY_NAME.get(name) || []
  )

  return (
    <Container
      as='section'
      id='open-source'
      css={theme({
        alignItems: 'center',
        width: '100%',
        py: SECTION_VERTICAL_SPACING,
        px: [1, 1, 5, 5]
      })}
      {...props}
    >
      <Flex
        css={theme({
          width: '100%',
          maxWidth: LAYOUT.maxWidth,
          mx: 'auto',
          flexDirection: ['column', 'column', 'column', 'row'],
          alignItems: ['center', 'center', 'center', 'stretch'],
          gap: LAYOUT.gap
        })}
      >
        <Flex
          css={theme({
            width: ['100%', '100%', '100%', LAYOUT.mainWidth],
            pt: [4, 4, 5, 0],
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          })}
        >
          <Flex
            css={theme({
              width: ['100%', '100%', '85%', '100%'],
              flexDirection: 'column',
              gap: [3, 3, 4, 4]
            })}
          >
            {primary && (
              <RepoCardItem
                repo={primary}
                tile={repoTile(primary, 0)}
                primary
              />
            )}
            <Flex
              css={theme({
                gap: [3, 3, 4, 4],
                flexDirection: ['column', 'column', 'row', 'row']
              })}
            >
              {secondary.map((repo, index) => (
                <RepoCardItem
                  key={repo.name}
                  repo={repo}
                  tile={repoTile(repo, index + 1)}
                  css={theme({ flex: 1 })}
                />
              ))}
            </Flex>
          </Flex>
        </Flex>
        <Flex
          css={theme({
            flexDirection: 'column',
            width: ['100%', '100%', '100%', LAYOUT.secondaryWidth],
            justifyContent: 'center',
            alignItems: ['center', 'center', 'center', 'flex-start'],
            order: [-1, -1, -1, 0]
          })}
        >
          <Subhead
            css={theme({
              textAlign: ['center', 'center', 'center', 'left'],
              width: '100%'
            })}
          >
            Built on{' '}
            <span
              css={
                accent === 'gradient' ? textGradient : theme({ color: accent })
              }
            >
              open source
            </span>
            ,
            <br />
            trusted by developers
          </Subhead>
          <Caption
            css={theme({
              pt: [3, 3, 4, 4],
              px: [4, 4, 4, 0],
              maxWidth: [
                layout.small,
                layout.small,
                layout.normal,
                layout.normal
              ],
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            {caption}
          </Caption>
          <Flex
            css={theme({
              pt: [3, 3, 4, 4],
              width: '100%',
              justifyContent: ['center', 'center', 'center', 'flex-start']
            })}
          >
            <ArrowLink
              href={ctaHref}
              css={theme({ fontSize: ['20px', '20px', '24px', '24px'] })}
            >
              {ctaLabel}
            </ArrowLink>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}

export default OpenSource
