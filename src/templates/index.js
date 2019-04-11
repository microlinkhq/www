import { useSiteMetadata } from 'components/hook'
import { graphql } from 'gatsby'
import React from 'react'

import PageTemplate from './page'
import DocTemplate from './doc'

export default function BlogPost ({ pageContext, data }, ...rest) {
  const { isDocPage, isBlogPage } = pageContext
  const { frontmatter, rawMarkdownBody } = data.markdownRemark
  const metadata = useSiteMetadata()

  const meta = {
    ...metadata,
    ...frontmatter,
    url: `${metadata.siteUrl}${frontmatter.slug}`
  }

  const date = frontmatter.date && new Date(frontmatter.date)

  if (isDocPage) return <DocTemplate meta={meta} content={rawMarkdownBody} />

  return (
    <PageTemplate
      meta={meta}
      date={date}
      isBlogPage={isBlogPage}
      content={rawMarkdownBody}
    />
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      rawMarkdownBody
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      fields {
        slug
      }
    }
  }
`
