import { toValidDate } from 'helpers/to-valid-date'

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

const withArticleDates = ({ publishedDate, modifiedDate }) => ({
  ...(publishedDate && {
    datePublished: publishedDate.toISOString()
  }),
  ...(modifiedDate && {
    dateModified: modifiedDate.toISOString()
  })
})

const articleSchema = ({
  type,
  title,
  description,
  url,
  image,
  publishedDate,
  modifiedDate
}) => ({
  ...articleBaseSchema({ title, description, url, image }),
  '@type': type,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': url
  },
  ...withArticleDates({ publishedDate, modifiedDate })
})

export const generateStructuredData = ({
  schemaType,
  title,
  description,
  url,
  image,
  publishedDate,
  modifiedDate
}) => {
  if (!schemaType) return null

  const normalizedPublishedDate = toValidDate(publishedDate)
  const normalizedModifiedDate =
    toValidDate(modifiedDate) || normalizedPublishedDate

  if (schemaType === 'Article') {
    return articleSchema({
      type: 'Article',
      title,
      description,
      url,
      image,
      publishedDate: normalizedPublishedDate,
      modifiedDate: normalizedModifiedDate
    })
  }

  if (schemaType === 'TechArticle') {
    return articleSchema({
      type: 'TechArticle',
      title,
      description,
      url,
      image,
      publishedDate: normalizedPublishedDate,
      modifiedDate: normalizedModifiedDate
    })
  }

  if (schemaType === 'SoftwareApplication') {
    return softwareBaseSchema({ title, description, url, image })
  }

  return null
}
