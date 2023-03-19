import { getActiveRouteName } from 'components/patterns/Aside/constants'
import { useSiteMetadata } from 'components/hook'
import { Meta } from 'components/elements'
import { cdnUrl } from 'helpers'
import { graphql } from 'gatsby'
import React from 'react'

import PageTemplate from './page'
import DocTemplate from './doc'

export const Head = ({ pageContext, location, data }) => {
  const metadata = useSiteMetadata()

  if (!pageContext.isDocPage) {
    return <Meta {...data.markdownRemark.frontmatter} />
  }

  const activeRouteName = getActiveRouteName(location)
  return (
    <Meta
      name='Microlink Docs'
      image={cdnUrl('banner/docs.jpeg')}
      title={`${metadata.name} ${activeRouteName}: ${data.markdownRemark.frontmatter.title}`}
      date={pageContext.lastEdited}
    />
  )
}

const Template = ({ pageContext, data, ...props }) => {
  const { isDocPage, isBlogPage, lastEdited, githubUrl } = pageContext
  const { frontmatter, rawMarkdownBody } = data.markdownRemark
  const metadata = useSiteMetadata()

  const meta = {
    ...metadata,
    ...frontmatter,
    url: `${metadata.siteUrl}${frontmatter.slug}`,
    date: lastEdited
  }

  if (!isDocPage) {
    return (
      <PageTemplate
        meta={meta}
        date={frontmatter.date && new Date(frontmatter.date)}
        isBlogPage={isBlogPage}
        content={rawMarkdownBody}
        {...props}
      />
    )
  }

  return (
    <DocTemplate
      meta={meta}
      content={rawMarkdownBody}
      githubUrl={githubUrl}
      {...props}
    />
  )
}

export const query = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      rawMarkdownBody
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        isPro
      }
      fields {
        slug
      }
    }
  }
`

export default Template
