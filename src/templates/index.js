import { useSiteMetadata } from 'components/hook'
import { graphql } from 'gatsby'
import React from 'react'

import PageTemplate from './page'
import DocTemplate from './doc'

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

  if (isDocPage) {
    return (
      <DocTemplate
        meta={meta}
        content={rawMarkdownBody}
        githubUrl={githubUrl}
        {...props}
      />
    )
  }

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

export const query = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      rawMarkdownBody
      timeToRead
      frontmatter {
        title
        isPro
        date(formatString: "MMMM DD, YYYY")
      }
      fields {
        slug
      }
    }
  }
`

export default Template
