const sharedContext = {
  provider: {
    '@type': 'Organization',
    '@id': 'https://microlink.io/about',
    name: 'Microlink',
    url: 'https://microlink.io'
  },
  isPartOf: {
    '@type': 'WebSite',
    '@id': 'https://microlink.io',
    url: 'https://microlink.io',
    name: 'Microlink'
  }
}

const articleBaseSchema = ({ title, description, url, image }) => ({
  '@context': 'https://schema.org',
  headline: title,
  description,
  url,
  image,
  author: {
    '@type': 'Organization',
    name: 'Microlink',
    url: 'https://microlink.io',
    logo: 'https://cdn.microlink.io/logo/logo.png'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Microlink',
    url: 'https://microlink.io',
    logo: {
      '@type': 'ImageObject',
      url: 'https://cdn.microlink.io/logo/logo.png'
    }
  },
  isPartOf: sharedContext.isPartOf
})

const softwareBaseSchema = ({ title, description, url, image }) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': url,
  name: title,
  description,
  url,
  image,
  applicationCategory: ['DeveloperApplication', 'API'],
  ...sharedContext
})

export const generateStructuredData = ({
  schemaType,
  title,
  description,
  url,
  image,
  date
}) => {
  if (!schemaType) return null

  if (schemaType === 'Article') {
    return {
      ...articleBaseSchema({ title, description, url, image }),
      '@type': 'Article',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url
      },
      ...(date && {
        datePublished: date.toISOString(),
        dateModified: date.toISOString()
      })
    }
  }

  if (schemaType === 'TechArticle') {
    return {
      ...articleBaseSchema({ title, description, url, image }),
      '@type': 'TechArticle',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url
      },
      ...(date && {
        datePublished: date.toISOString(),
        dateModified: date.toISOString()
      })
    }
  }

  if (schemaType === 'SoftwareApplication') {
    return softwareBaseSchema({ title, description, url, image })
  }

  return null
}
