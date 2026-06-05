import Box from 'components/elements/Box'
import Image from 'components/elements/Image/Image'
import Text from 'components/elements/Text'
import React from 'react'
import styled from 'styled-components'
import { theme } from 'theme'

const THEMES = [
  'prism-atom-dark',
  'prism-atom-one-dark',
  'prism-atom-one-light',
  'prism-aura-dark',
  'prism-automad-dark',
  'prism-automad-light',
  'prism-ayu-dark',
  'prism-ayu-light',
  'prism-ayu-mirage',
  'prism-bearded-arc-blueberry',
  'prism-bearded-vivid-light',
  'prism-boola-dark',
  'prism-boola-light',
  'prism-catppuccin-frappe',
  'prism-catppuccin-latte',
  'prism-catppuccin-macchiato',
  'prism-catppuccin-mocha',
  'prism-coldark-cold',
  'prism-coldark-dark',
  'prism-dark-frost',
  'prism-dark-space',
  'prism-dracula',
  'prism-duotone-dark',
  'prism-duotone-earth',
  'prism-duotone-forest',
  'prism-duotone-light',
  'prism-duotone-sea',
  'prism-duotone-space',
  'prism-github-dark',
  'prism-github-light',
  'prism-gruvbox-dark',
  'prism-gruvbox-light',
  'prism-laserwave',
  'prism-night-owl-light',
  'prism-night-owl',
  'prism-nightfall',
  'prism-nord',
  'prism-panda',
  'prism-poimandres',
  'prism-rose-pine-dawn',
  'prism-rose-pine',
  'prism-sakura-sun',
  'prism-sea-shells-dark',
  'prism-serendipity-midnight',
  'prism-serendipity-morning',
  'prism-serendipity-sunset',
  'prism-shades-of-purple',
  'prism-solarized-dark-atom',
  'prism-synthwave84',
  'prism-tailwind-ice',
  'prism-tailwind-moon-blue',
  'prism-tokyo-night-light',
  'prism-tokyo-night-storm',
  'prism-tokyo-night',
  'prism-verdandi-alter',
  'prism-verdandi',
  'prism-violet-dream',
  'prism-vsc-dark-plus'
]

const COMBO_THEMES = [
  {
    name: 'Automad',
    light: 'prism-automad-light',
    dark: 'prism-automad-dark'
  },
  {
    name: 'Atom One',
    light: 'prism-atom-one-light',
    dark: 'prism-atom-one-dark'
  },
  {
    name: 'Ayu',
    light: 'prism-ayu-light',
    dark: 'prism-ayu-dark'
  },
  {
    name: 'Ayu Mirage',
    light: 'prism-ayu-light',
    dark: 'prism-ayu-mirage'
  },
  {
    name: 'Bearded Arc Blueberry',
    light: 'prism-bearded-vivid-light',
    dark: 'prism-bearded-arc-blueberry'
  },
  {
    name: 'Boola',
    light: 'prism-boola-light',
    dark: 'prism-boola-dark'
  },
  {
    name: 'Catppuccin Frappe',
    light: 'prism-catppuccin-latte',
    dark: 'prism-catppuccin-frappe'
  },
  {
    name: 'Catppuccin Macchiato',
    light: 'prism-catppuccin-latte',
    dark: 'prism-catppuccin-macchiato'
  },
  {
    name: 'Catppuccin Mocha',
    light: 'prism-catppuccin-latte',
    dark: 'prism-catppuccin-mocha'
  },
  {
    name: 'Coldark',
    light: 'prism-coldark-cold',
    dark: 'prism-coldark-dark'
  },
  {
    name: 'GitHub',
    light: 'prism-github-light',
    dark: 'prism-github-dark'
  },
  {
    name: 'Gruvbox',
    light: 'prism-gruvbox-light',
    dark: 'prism-gruvbox-dark'
  },
  {
    name: 'Night Owl',
    light: 'prism-night-owl-light',
    dark: 'prism-night-owl'
  },
  {
    name: 'Rose Pine',
    light: 'prism-rose-pine-dawn',
    dark: 'prism-rose-pine'
  },
  {
    name: 'Serendipity Midnight',
    light: 'prism-serendipity-morning',
    dark: 'prism-serendipity-midnight'
  },
  {
    name: 'Serendipity Sunset',
    light: 'prism-serendipity-morning',
    dark: 'prism-serendipity-sunset'
  },
  {
    name: 'Tailwind Moon Blue',
    light: 'prism-tailwind-ice',
    dark: 'prism-tailwind-moon-blue'
  },
  {
    name: 'Tokyo Night',
    light: 'prism-tokyo-night-light',
    dark: 'prism-tokyo-night'
  },
  {
    name: 'Tokyo Night Storm',
    light: 'prism-tokyo-night-light',
    dark: 'prism-tokyo-night-storm'
  },
  {
    name: 'Verdandi',
    light: 'prism-verdandi',
    dark: 'prism-verdandi-alter'
  }
]

const BASE_GITHUB_URL = 'https://github.com/automadcms/automad-prism-themes'
const BASE_GITHUB_THEMES_BLOB_URL = `${BASE_GITHUB_URL}/blob/master/themes`
const BASE_GITHUB_COMBOS_BLOB_URL = `${BASE_GITHUB_URL}/blob/master/light-dark.json`
const BASE_SCREENSHOT_URL =
  'https://raw.githubusercontent.com/automadcms/automad-prism-themes/master/screenshots'

const getThemeName = slug =>
  slug
    .replace(/^prism-/, '')
    .replace(/\.css$/, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const Grid = styled(Box)(
  theme({
    display: 'grid',
    gridTemplateColumns: [
      'repeat(2, minmax(0, 1fr))',
      'repeat(2, minmax(0, 1fr))',
      'repeat(3, minmax(0, 1fr))',
      'repeat(3, minmax(0, 1fr))'
    ],
    rowGap: [2, 3, 4, 4],
    columnGap: [2, 2, 3, 3],
    mt: [3, 4],
    mb: [4]
  })
)

const ThemeLink = styled.a(
  theme({
    display: 'block',
    color: 'inherit',
    textDecoration: 'none',
    minHeight: '44px',
    touchAction: 'manipulation'
  })
)

const PreviewWrap = styled(Box)(
  theme({
    overflow: 'hidden',
    transitionProperty: 'transform, border-color',
    transitionDuration: '180ms',
    transitionTiming: 'ease'
  }),
  `
    ${ThemeLink}:hover & {
      transform: translateY(-1px);
    }

    ${ThemeLink}:focus-visible & {
      outline: 2px solid rgba(6, 125, 247, 0.55);
      outline-offset: 1px;
    }
  `
)

const Preview = styled(Image)(
  theme({
    width: '100%',
    height: 'auto',
    objectPosition: 'center top',
    borderRadius: 3
  }),
  `
    aspect-ratio: 16 / 9;
    object-fit: cover;
  `
)

const ComboCanvas = styled(Box)(
  theme({
    position: 'relative',
    width: '100%',
    overflow: 'hidden'
  }),
  `
    aspect-ratio: 16 / 11;
  `
)

const ComboPreviewLight = styled(Image)(
  theme({
    pos: 'absolute',
    top: 0,
    left: 0,
    width: '90%'
  })
)

const ComboPreviewDark = styled(Image)(
  theme({
    pos: 'absolute',
    bottom: 0,
    left: '10%',
    width: '90%'
  })
)

const Label = styled(Text)(
  theme({
    mt: [2, 2, 3, 3],
    px: 0,
    py: 0,
    fontSize: [0, 1, 1, 1],
    lineHeight: 0,
    color: 'gray7'
  })
)

const ComboLabel = styled(Text)(
  theme({
    mt: [1, 1, 2, 2],
    px: 0,
    py: 0,
    fontSize: [0, 0, 1, 1],
    lineHeight: 0,
    color: 'gray6'
  })
)

export const CodeSchemeThemePreview = () => (
  <Grid as='ul'>
    {THEMES.map(slug => {
      const name = getThemeName(slug)
      const cssUrl = `${BASE_GITHUB_THEMES_BLOB_URL}/${slug}.css`
      const screenshotUrl = `${BASE_SCREENSHOT_URL}/${slug}.png`

      return (
        <Box as='li' key={slug} css={theme({ listStyle: 'none' })}>
          <ThemeLink
            href={cssUrl}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Open ${name} theme stylesheet on GitHub`}
          >
            <PreviewWrap>
              <Preview
                src={screenshotUrl}
                alt={`${name} code theme preview`}
                loading='lazy'
              />
            </PreviewWrap>
            <Label>{name}</Label>
          </ThemeLink>
        </Box>
      )
    })}
  </Grid>
)

export const CodeSchemeThemeComboPreview = () => (
  <Grid as='ul'>
    {COMBO_THEMES.map(({ name, light, dark }) => {
      const lightScreenshotUrl = `${BASE_SCREENSHOT_URL}/${light}.png`
      const darkScreenshotUrl = `${BASE_SCREENSHOT_URL}/${dark}.png`

      return (
        <Box as='li' key={name} css={theme({ listStyle: 'none' })}>
          <ThemeLink
            href={BASE_GITHUB_COMBOS_BLOB_URL}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Open ${name} combo theme definition on GitHub`}
          >
            <PreviewWrap>
              <ComboCanvas>
                <ComboPreviewLight
                  src={lightScreenshotUrl}
                  alt={`${name} light theme preview`}
                  loading='lazy'
                />
                <ComboPreviewDark
                  src={darkScreenshotUrl}
                  alt={`${name} dark theme preview`}
                  loading='lazy'
                />
              </ComboCanvas>
            </PreviewWrap>
            <Label>{name}</Label>
            <ComboLabel>Light / Dark</ComboLabel>
          </ThemeLink>
        </Box>
      )
    })}
  </Grid>
)
