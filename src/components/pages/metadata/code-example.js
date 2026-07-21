import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { SECTION_VERTICAL_SPACING, layout, shadows, theme } from 'theme'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import LineBreak from 'components/elements/LineBreak'
import ArrowLink from 'components/patterns/ArrowLink'
import MultiCodeEditorInteractive from 'components/patterns/MultiCodeEditor/MultiCodeEditorInteractive'
import { ACCENT, Caption, FIRST_URL, HERO_LAYOUT, Subhead } from './shared'

const CODE_EXAMPLE_LANGUAGES = ['JavaScript', 'Python', 'Ruby', 'PHP', 'Golang']

const TYPE_SPEED_MS = 90

const DELETE_SPEED_MS = 60

const HOLD_TYPED_MS = 2000

const BETWEEN_WORDS_MS = 250

const cursorBlink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`

const TypedLanguage = styled('span')`
  color: ${ACCENT};
`

const TypedCursor = styled('span')`
  ${theme({ display: 'inline-block', ml: 1 })};
  color: ${ACCENT};
  animation: ${cursorBlink} 1s step-end infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const CodeExample = ({ currentUrl }) => {
  const [languageIndex, setLanguageIndex] = useState(0)
  const [typedLanguage, setTypedLanguage] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentLanguage = CODE_EXAMPLE_LANGUAGES[languageIndex]
    const hasTypedWholeWord = !isDeleting && typedLanguage === currentLanguage
    const hasDeletedWholeWord = isDeleting && typedLanguage.length === 0

    const delay = hasTypedWholeWord
      ? HOLD_TYPED_MS
      : hasDeletedWholeWord
        ? BETWEEN_WORDS_MS
        : isDeleting
          ? DELETE_SPEED_MS
          : TYPE_SPEED_MS

    const timer = setTimeout(() => {
      if (hasTypedWholeWord) {
        setIsDeleting(true)
      } else if (hasDeletedWholeWord) {
        setIsDeleting(false)
        setLanguageIndex(i => (i + 1) % CODE_EXAMPLE_LANGUAGES.length)
      } else if (isDeleting) {
        setTypedLanguage(prev => prev.slice(0, -1))
      } else {
        setTypedLanguage(currentLanguage.slice(0, typedLanguage.length + 1))
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [typedLanguage, isDeleting, languageIndex])

  return (
    <Container
      id='code-example'
      as='section'
      css={theme({
        alignItems: 'center',
        width: '100%',
        py: SECTION_VERTICAL_SPACING,
        px: [1, 1, 5, 5]
      })}
    >
      <Flex
        css={theme({
          width: '100%',
          maxWidth: HERO_LAYOUT.maxWidth,
          mx: 'auto',
          flexDirection: ['column', 'column', 'column', 'row'],
          alignItems: ['center', 'center', 'center', 'stretch'],
          gap: HERO_LAYOUT.gap
        })}
      >
        <Flex
          css={theme({
            flexDirection: 'column',
            width: ['100%', '100%', '100%', HERO_LAYOUT.secondaryWidth],
            justifyContent: 'center',
            alignItems: ['center', 'center', 'center', 'flex-start']
          })}
        >
          <Subhead
            css={theme({
              textAlign: ['center', 'center', 'center', 'left'],
              width: '100%'
            })}
          >
            Metadata API <LineBreak /> in{' '}
            <TypedLanguage>
              {typedLanguage}
              <TypedCursor aria-hidden='true'>|</TypedCursor>
            </TypedLanguage>
          </Subhead>
          <Caption
            forwardedAs='div'
            css={theme({
              pt: [3, 3, 4, 4],
              textAlign: ['center', 'center', 'center', 'left'],
              maxWidth: [
                layout.small,
                layout.small,
                layout.normal,
                layout.normal
              ]
            })}
          >
            The Microlink website metadata API delivers unified structured data
            through a developer-friendly HTTP endpoint. One URL in, normalized
            metadata out — ready to power link previews, URL previews, content
            ingestion, and social card generation.
          </Caption>
          <Flex
            css={theme({
              pt: [3, 3, 4, 4],
              width: '100%',
              fontSize: [2, 2, 3, 3],
              justifyContent: ['center', 'center', 'center', 'flex-start']
            })}
          >
            <ArrowLink href='/docs/guides/metadata'>Read the docs</ArrowLink>
          </Flex>
        </Flex>
        <Flex
          css={theme({
            width: ['100%', '100%', '100%', HERO_LAYOUT.mainWidth],
            pt: [4, 4, 5, 0],
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          })}
        >
          <Flex
            css={[
              theme({
                width: ['100%', '100%', '85%', '100%'],
                justifyContent: 'center',
                pt: [0, 0, 4, 4],
                pb: [4, 4, 4, 5],
                px: [2, 3, 0, 0]
              }),
              {
                '& > div, & > div > div:first-child': {
                  width: '100%'
                },
                '& > div > div:first-child': {
                  boxShadow: `${shadows[4]}`
                }
              }
            ]}
          >
            <MultiCodeEditorInteractive
              height={320}
              mqlCode={{
                url: currentUrl || FIRST_URL,
                meta: true
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}
