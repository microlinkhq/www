import { getActiveRouteName } from 'components/patterns/Aside/constants'
import { useSiteMetadata } from 'components/hook/use-site-meta'
import Meta from 'components/elements/Meta/Meta'
import { cdnUrl } from 'helpers/cdn-url'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import PageTemplate from './page'
import DocTemplate from './doc'

export const Head = ({ pageContext, location }) => {
  const {
    description,
    isDocPage,
    isBlogPage,
    frontmatter = {},
    lastEdited
  } = pageContext
  const authorsData = useStaticQuery(graphql`
    query BlogAuthorsMetaData {
      allAuthorsYaml {
        nodes {
          key
          name
        }
      }
    }
  `)
  const siteMetadata = useSiteMetadata()
  const { name: siteName } = siteMetadata

  if (isDocPage || isBlogPage) {
    const activeRouteName = getActiveRouteName(location)
    const validDate =
      lastEdited && !isNaN(new Date(lastEdited).getTime())
        ? lastEdited
        : undefined

    const metaProps = {
      ...frontmatter,
      description,
      name: isDocPage ? 'Microlink Docs' : 'Microlink Blog',
      image: isDocPage
        ? cdnUrl('banner/docs.jpeg')
        : cdnUrl('banner/blog.jpeg'),
      title: isDocPage
        ? `${siteName} ${activeRouteName}: ${frontmatter.title || ''}`
        : frontmatter.title,
      date: validDate,
      schemaType: isBlogPage ? 'Article' : 'TechArticle',
      authors: isBlogPage
        ? (() => {
            const authorsByKey = new Map(
              (authorsData?.allAuthorsYaml?.nodes || []).map(author => [
                author.key,
                author.name
              ])
            )
            const authorKeys = frontmatter.authors || []
            return authorKeys
              .map(key => authorsByKey.get(key))
              .filter(Boolean)
          })()
        : undefined
    }

    return <Meta {...metaProps} />
  }

  return <Meta {...frontmatter} />
}

const Template = ({ pageContext, children, ...props }) => {
  const {
    isDocPage,
    isBlogPage,
    lastEdited,
    githubUrl,
    frontmatter = {}
  } = pageContext
  const date = frontmatter.date ?? lastEdited

  if (isDocPage) {
    return (
      <DocTemplate
        title={frontmatter.title}
        isPro={frontmatter.isPro}
        date={date}
        content={children}
        githubUrl={githubUrl}
        {...props}
      />
    )
  }

  return (
    <PageTemplate
      title={frontmatter.title}
      subtitle={frontmatter.subtitle}
      authors={frontmatter.authors}
      date={date && new Date(date)}
      lastEdited={frontmatter.lastEdited ? lastEdited : null}
      isBlogPage={isBlogPage}
      content={children}
      {...props}
    />
  )
}

export default Template
