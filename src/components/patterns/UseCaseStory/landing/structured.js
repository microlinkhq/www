import {
  CUSTOMERS,
  CUSTOMERS_HUB,
  CUSTOMERS_PATH,
  customerPath
} from 'components/patterns/CustomerStory/customers'

import { plain } from './inline-links'
import {
  getUseCase,
  getVertical,
  pathToUseCase,
  verticalUseCases
} from '../use-cases'

const SITE_URL = 'https://microlink.io'
const CONTEXT = 'https://schema.org'

const breadcrumbList = (url, crumbs) => ({
  '@context': CONTEXT,
  '@type': 'BreadcrumbList',
  '@id': `${url}#breadcrumb`,
  itemListElement: crumbs.map(({ name, item }, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name,
    item
  }))
})

const plainAnswer = answer =>
  Array.isArray(answer) ? answer.map(plain).join(' ') : plain(answer)

const faqPage = (url, faq) => ({
  '@context': CONTEXT,
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  mainEntity: faq.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: plainAnswer(answer) }
  }))
})

const stripStepNumber = label => label.replace(/^\d+\s*·\s*/, '')

const howToSteps = content =>
  content.howTo
    ? content.howTo.steps
    : content.how.steps.map(step => ({
      title: stripStepNumber(step.label),
      description: plain(step.note) || stripStepNumber(step.label)
    }))

const howTo = (url, content, entry, vertical) => ({
  '@context': CONTEXT,
  '@type': 'HowTo',
  '@id': `${url}#howto`,
  name: content.howTo ? content.howTo.name : content.hero.title,
  description: content.head.description,
  tool: [{ '@type': 'HowToTool', name: vertical.product }],
  keywords: (entry.keywords || []).join(', '),
  step: howToSteps(content).map(({ title, description }, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: title,
    text: description
  }))
})

export const useCaseStructured = content => {
  const entry = getUseCase(content.slug)
  const vertical = getVertical(entry.vertical)
  const url = `${SITE_URL}${pathToUseCase(content.slug)}`

  return [
    breadcrumbList(url, [
      { name: 'Microlink', item: SITE_URL },
      { name: 'Use cases', item: `${SITE_URL}/use-cases` },
      { name: vertical.name, item: `${SITE_URL}${pathToUseCase(vertical.slug)}` },
      { name: content.hero.title, item: url }
    ]),
    faqPage(url, content.faq),
    howTo(url, content, entry, vertical)
  ]
}

export const verticalStructured = vertical => {
  const url = `${SITE_URL}${pathToUseCase(vertical.slug)}`

  return [
    breadcrumbList(url, [
      { name: 'Microlink', item: SITE_URL },
      { name: 'Use cases', item: `${SITE_URL}/use-cases` },
      { name: vertical.name, item: url }
    ]),
    {
      '@context': CONTEXT,
      '@type': 'ItemList',
      '@id': `${url}#use-cases`,
      name: vertical.hub.h1,
      itemListElement: verticalUseCases(vertical.slug).map(
        (entry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: entry.name,
          url: `${SITE_URL}${pathToUseCase(entry.slug)}`
        })
      )
    }
  ]
}

export const customersStructured = () => {
  const url = `${SITE_URL}${CUSTOMERS_PATH}`

  return [
    breadcrumbList(url, [
      { name: 'Microlink', item: SITE_URL },
      { name: 'Use cases', item: `${SITE_URL}/use-cases` },
      { name: CUSTOMERS_HUB.name, item: url }
    ]),
    {
      '@context': CONTEXT,
      '@type': 'ItemList',
      '@id': `${url}#stories`,
      name: CUSTOMERS_HUB.h1,
      itemListElement: CUSTOMERS.map(({ slug, name }, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
        url: `${SITE_URL}${customerPath(slug)}`
      }))
    }
  ]
}

export const industryStructured = industry => {
  const url = `${SITE_URL}${pathToUseCase(industry.slug)}`

  return [
    breadcrumbList(url, [
      { name: 'Microlink', item: SITE_URL },
      { name: 'Use cases', item: `${SITE_URL}/use-cases` },
      { name: industry.name, item: url }
    ]),
    {
      '@context': CONTEXT,
      '@type': 'ItemList',
      '@id': `${url}#use-cases`,
      name: industry.h1,
      itemListElement: industry.useCases.map(getUseCase).map(
        (entry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: entry.name,
          url: `${SITE_URL}${pathToUseCase(entry.slug)}`
        })
      )
    },
    faqPage(url, industry.faq)
  ]
}
