import { space, theme } from 'theme'
import React, { useMemo, useRef } from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'

import ArrowLink from 'components/patterns/ArrowLink'
import { CustomerCard } from 'components/patterns/CustomerStory/CustomerCard'
import {
  CUSTOMERS,
  CUSTOMERS_PATH
} from 'components/patterns/CustomerStory/customers'

import { ProductTabs, panelId, tabId } from './product-tabs'
import { useActiveGroup } from './use-active-group'
import { CardGrid, UseCaseCard } from './use-case-card'
import {
  PARTNER_ACCENT,
  VERTICALS,
  partnerUseCases,
  pathToUseCase,
  verticalUseCases
} from '../use-cases'

const MAX_CARDS_PER_TAB = 6

const CUSTOMERS_GROUP = {
  id: 'stories',
  label: 'Customer stories',
  accent: 'link',
  href: CUSTOMERS_PATH,
  linkLabel: 'All customer stories',
  Card: CustomerCard,
  entries: CUSTOMERS.slice(0, MAX_CARDS_PER_TAB)
}

const PARTNERS_GROUP = {
  id: 'partner-recipes',
  label: 'Partner recipes',
  accent: PARTNER_ACCENT,
  Card: UseCaseCard
}

const uncapitalize = name => name.charAt(0).toLowerCase() + name.slice(1)

const Panel = styled(Box)`
  &[hidden] {
    display: none;
  }
`

const toGroup = vertical => ({
  id: vertical.slug,
  label: vertical.product,
  accent: vertical.iconBg,
  href: pathToUseCase(vertical.slug),
  linkLabel: `All ${uncapitalize(vertical.name)} use cases`,
  Card: UseCaseCard,
  entries: verticalUseCases(vertical.slug).slice(0, MAX_CARDS_PER_TAB)
})

const toGroups = () => {
  const verticals = VERTICALS.map(toGroup)
  const partners = partnerUseCases()

  return [
    CUSTOMERS_GROUP,
    ...verticals,
    ...(partners.length > 0 ? [{ ...PARTNERS_GROUP, entries: partners }] : [])
  ].filter(({ entries }) => entries.length > 0)
}

export const UseCaseGroups = () => {
  const groups = useMemo(toGroups, [])
  const ids = useMemo(() => groups.map(({ id }) => id), [groups])
  const containerRef = useRef(null)
  const [active, select] = useActiveGroup(ids, containerRef)

  return (
    <Box ref={containerRef} css={theme({ scrollMarginTop: space[6] })}>
      <ProductTabs
        groups={groups}
        active={active}
        onSelect={select}
        label='Customer stories and use cases by product'
      />

      {groups.map(group => (
        <Panel
          key={group.id}
          id={panelId(group.id)}
          role='tabpanel'
          aria-labelledby={tabId(group.id)}
          hidden={group.id !== active}
          css={theme({ pt: 4 })}
        >
          <CardGrid>
            {group.entries.map(entry => (
              <group.Card key={entry.slug} entry={entry} />
            ))}
          </CardGrid>
          {group.href && (
            <Box css={theme({ pt: [3, 3, 4, 4] })}>
              <ArrowLink
                href={group.href}
                css={theme({
                  color: 'link',
                  fontWeight: 'bold',
                  fontSize: [1, 2, 2, 2]
                })}
              >
                {group.linkLabel}
              </ArrowLink>
            </Box>
          )}
        </Panel>
      ))}
    </Box>
  )
}
