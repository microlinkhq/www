import React, { useState } from 'react'
import styled from 'styled-components'
import { shadows, theme } from 'theme'

import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import ArrowLink from 'components/patterns/ArrowLink'
import { SignupLink } from 'components/patterns/SignupLink'
import { HeroEditorTabs } from 'components/patterns/MultiCodeEditor/hero-editor-tabs'
import MultiCodeEditorInteractive from 'components/patterns/MultiCodeEditor/MultiCodeEditorInteractive'

const EDITOR_ID = 'product-hero-editor'

export const EDITOR_FRAME = {
  '& > div, & > div > div:first-child': {
    width: '100%'
  },
  '& > div > div:first-child': {
    boxShadow: shadows[4]
  }
}

const ActionsRow = styled(Flex)`
  ${theme({
    pt: [3, 3, 4, 4],
    width: '100%',
    fontSize: [2, 2, 3, 3],
    columnGap: [3, 3, 4, 4],
    rowGap: 2,
    flexWrap: 'wrap',
    alignItems: 'center',
    whiteSpace: 'nowrap'
  })}
`

export const HeroActions = ({
  cta,
  product,
  redirect,
  ctaHref,
  ctaLabel = 'Get your free API key',
  secondaryHref,
  secondaryLabel,
  justifyContent
}) => (
  <ActionsRow css={theme({ justifyContent })}>
    {cta
      ? (
        <SignupLink cta={cta} product={product} redirect={redirect}>
          {ctaLabel}
        </SignupLink>
        )
      : (
        <ArrowLink href={ctaHref}>{ctaLabel}</ArrowLink>
        )}
    {secondaryHref && <Link href={secondaryHref}>{secondaryLabel}</Link>}
  </ActionsRow>
)

export const HeroEditor = ({
  mqlCode,
  examples,
  examplesLabel = 'Examples',
  editorHeight = 320
}) => {
  const [exampleIndex, setExampleIndex] = useState(0)
  const activeMqlCode = examples ? examples[exampleIndex].mqlCode : mqlCode

  return (
    <MultiCodeEditorInteractive
      height={editorHeight}
      mqlCode={activeMqlCode}
      contentId={examples ? EDITOR_ID : undefined}
      contentRole={examples ? 'tabpanel' : undefined}
      contentLabelledBy={
        examples ? `product-hero-tab-${exampleIndex}` : undefined
      }
      headerContent={
        examples
          ? (
            <HeroEditorTabs
              examples={examples}
              selectedIndex={exampleIndex}
              onSelect={setExampleIndex}
              ariaLabel={examplesLabel}
              idPrefix='product-hero-tab'
              controlsId={EDITOR_ID}
            />
            )
          : undefined
      }
    />
  )
}
