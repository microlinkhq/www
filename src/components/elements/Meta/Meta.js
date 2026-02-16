import { useLocation } from '@gatsbyjs/reach-router'
import {
  getCreatedFromPathname,
  getLastModifiedFromPathname
} from 'helpers/git/date'
import { useSiteMetadata } from 'components/hook/use-site-meta'
import React, { useMemo } from 'react'
import { generateStructuredData } from './structured'

const getPage = ({ pathname }) => pathname.replace(/\/+$/, '').substring(1)

const getTitle = location => {
  if (!location) return
  const page = getPage(location)
  return page.charAt(0).toUpperCase() + page.slice(1)
}

const normalizeAuthor = (authors, fallbackAuthor) => {
  if (Array.isArray(authors)) return authors.filter(Boolean).join(', ')
  return authors || fallbackAuthor
}

const mergeMeta = (props, location, metadata) => {
  const { siteUrl, video, twitter, headline, author: fallbackAuthor } = metadata
  const title = props.title || getTitle(location) || headline

  let {
    dataLabel1,
    dataLabel2,
    dataValue1,
    dataValue2,
    image,
    logo,
    name,
    noSuffix,
    publishedDate,
    modifiedDate,
    robots = 'index, follow',
    schemaType,
    authors: inputAuthors
  } = {
    ...metadata,
    ...props
  }

  const description = props.description || metadata.description || headline

  const url = location ? `${siteUrl}${location.pathname}` : siteUrl

  const author = normalizeAuthor(inputAuthors, fallbackAuthor)

  if (!modifiedDate) {
    modifiedDate = getLastModifiedFromPathname(location?.pathname)
  }

  if (!publishedDate) {
    publishedDate = getCreatedFromPathname(location?.pathname) || modifiedDate
  }

  return {
    dataLabel1,
    dataLabel2,
    dataValue1,
    dataValue2,
    description,
    image,
    logo,
    name,
    title,
    twitter,
    url,
    video,
    robots,
    noSuffix,
    publishedDate,
    modifiedDate,
    schemaType,
    author
  }
}

function Meta ({ structured, ...props }) {
  const siteMetadata = useSiteMetadata()
  const location = useLocation()

  const {
    dataLabel1,
    dataLabel2,
    dataValue1,
    dataValue2,
    description,
    image,
    logo,
    name,
    title,
    twitter,
    url,
    video,
    robots,
    noSuffix,
    publishedDate,
    modifiedDate,
    schemaType,
    author
  } = useMemo(
    () => mergeMeta(props, location, siteMetadata),
    [props, location, siteMetadata]
  )

  const fullTitle = noSuffix ? title : `${title} — ${name}`

  const autoStructuredData = useMemo(
    () =>
      generateStructuredData({
        schemaType,
        title: fullTitle,
        description,
        url,
        image,
        publishedDate,
        modifiedDate,
        author
      }),
    [
      schemaType,
      fullTitle,
      description,
      url,
      image,
      publishedDate,
      modifiedDate,
      author
    ]
  )

  const allStructuredData = useMemo(() => {
    const customSchemas = structured
      ? Array.isArray(structured)
        ? structured
        : [structured]
      : []
    return autoStructuredData
      ? [autoStructuredData, ...customSchemas]
      : customSchemas
  }, [autoStructuredData, structured])

  return (
    <>
      {/* <!-- Search Engine --> */}
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      <meta name='image' content={image} />
      <meta name='author' content={author} />
      <meta name='robots' content={robots} />
      <meta name='googlebot' content={robots} />
      {/* <!-- Schema.org for Google --> */}
      <meta itemProp='name' content={fullTitle} />
      <meta itemProp='description' content={description} />
      <meta itemProp='image' content={image} />
      <meta itemProp='author' content={author} />
      {/* <!-- Twitter --> */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:site' content={twitter} />
      <meta name='twitter:domain' content={url} />
      <meta name='twitter:player:stream' content={video} />
      <meta name='twitter:image' content={image} />
      <meta name='twitter:creator' content={twitter} />
      <meta name='twitter:label1' content={dataLabel1} />
      <meta name='twitter:data1' content={dataValue1} />
      <meta name='twitter:label2' content={dataLabel2} />
      <meta name='twitter:data2' content={dataValue2} />
      {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
      <meta property='og:url' content={url} />
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:video:secure_url' content={video} />
      <meta property='og:logo' content={logo} />
      <meta property='og:site_name' content={name} />
      <meta property='og:locale' content='en_US' />
      <meta property='og:type' content='website' />
      {publishedDate && (
        <meta
          property='article:published_time'
          content={publishedDate.toISOString()}
        />
      )}
      {modifiedDate && (
        <meta
          property='article:modified_time'
          content={modifiedDate.toISOString()}
        />
      )}
      {/* <!-- JSON-LD Structured Data --> */}
      {allStructuredData.map(schema => (
        <script key={JSON.stringify(schema)} type='application/ld+json'>
          {JSON.stringify(schema)}
        </script>
      ))}
    </>
  )
}

export default Meta
