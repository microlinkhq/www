import { getActiveRouteName } from 'components/patterns/Aside/constants'
import { useSiteMetadata } from 'components/hook'
import { Meta } from 'components/elements'
import { cdnUrl } from 'helpers'
import { graphql } from 'gatsby'
import React from 'react'

import PageTemplate from './page'
import DocTemplate from './doc'

export const Head = ({ pageContext, location, data }) => {
  if (!pageContext.isDocPage) {
    return <Meta {...data.markdownRemark.frontmatter} />
  }

  const { name } = useSiteMetadata()
  const activeRouteName = getActiveRouteName(location)

  return (
    <Meta
      name='Microlink Docs'
      image={cdnUrl('banner/docs.jpeg')}
      title={`${name} ${activeRouteName}: ${data.markdownRemark.frontmatter.title}`}
      date={pageContext.lastEdited}
    />
  )
}

const Template = ({ pageContext, data, ...props }) => {
  const { isDocPage, isBlogPage, lastEdited, githubUrl } = pageContext
  const { frontmatter, rawMarkdownBody } = data.markdownRemark
  const date = frontmatter.date ?? lastEdited

  if (!isDocPage) {
    return (
      <PageTemplate
        title={frontmatter.title}
        date={date && new Date(date)}
        isBlogPage={isBlogPage}
        content={rawMarkdownBody}
        {...props}
      />
    )
  }

  return (
    <DocTemplate
      title={frontmatter.title}
      isPro={frontmatter.isPro}
      date={date}
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
