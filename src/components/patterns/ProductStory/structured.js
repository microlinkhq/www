const SITE_URL = 'https://microlink.io'

const PROVIDER = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/about`,
  name: 'Microlink',
  url: SITE_URL
}

const IS_PART_OF = {
  '@type': 'WebSite',
  '@id': SITE_URL,
  url: SITE_URL,
  name: 'Microlink'
}

const OFFERS = {
  '@type': 'Offer',
  price: '0',
  priceCurrency: 'EUR',
  description:
    'Free tier available (25 requests/day). Pro plans start at €39/month for production workloads.',
  url: `${SITE_URL}/pricing`
}

export const toFaqQuestions = items =>
  items.map(({ question, text, answer }) => ({
    question,
    answer: answer || text
  }))

export const productStructured = ({
  path,
  name,
  description,
  keywords,
  about = [],
  stars,
  starsRepo,
  faqItems = []
}) => {
  const url = `${SITE_URL}${path}`

  const softwareApplication = {
    '@type': 'SoftwareApplication',
    '@id': url,
    name,
    description,
    url,
    applicationCategory: ['DeveloperApplication', 'WebAPI'],
    operatingSystem: 'Web, Platform-Agnostic',
    provider: PROVIDER,
    isPartOf: IS_PART_OF,
    offers: OFFERS,
    keywords,
    about: about.map(({ name: thingName, sameAs }) => ({
      '@type': 'Thing',
      name: thingName,
      sameAs
    }))
  }

  if (stars && starsRepo) {
    softwareApplication.interactionStatistic = {
      '@type': 'InteractionCounter',
      interactionType: { '@type': 'https://schema.org/LikeAction' },
      userInteractionCount: stars,
      interactionService: {
        '@type': 'WebSite',
        name: 'GitHub',
        url: `https://github.com/microlinkhq/${starsRepo}`
      }
    }
  }

  const graph = [softwareApplication]

  if (faqItems.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      url,
      mainEntity: faqItems.map(({ question, text }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text }
      }))
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}
