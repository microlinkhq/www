import { getActiveRouteName } from 'components/patterns/Aside/constants'
import { useSiteMetadata } from 'components/hook/use-site-meta'
import Meta from 'components/elements/Meta/Meta'
import { cdnUrl } from 'helpers/cdn-url'
import { graphql } from 'gatsby'
import React from 'react'

import PageTemplate from './page'
import DocTemplate from './doc'

const HeadDoc = ({ data, location, pageContext }) => {
  const { name } = useSiteMetadata()
  const activeRouteName = getActiveRouteName(location)

  return (
    <Meta
      name='Microlink Docs'
      image={cdnUrl('banner/docs.jpeg')}
      title={`${name} ${activeRouteName}: ${data.mdx.frontmatter.title}`}
      date={pageContext.lastEdited}
    />
  )
}

export const Head = ({ pageContext, location, data }) =>
  pageContext.isDocPage
    ? (
        HeadDoc({ location, pageContext, data })
      )
    : (
      <Meta {...data.mdx.frontmatter} />
      )

const Template = ({ pageContext, data, children, ...props }) => {
  const { isDocPage, isBlogPage, lastEdited, githubUrl } = pageContext
  const { frontmatter } = data.mdx
  const date = frontmatter.date ?? lastEdited

  if (!isDocPage) {
    return (
      <PageTemplate
        title={frontmatter.title}
        date={date && new Date(date)}
        lastEdited={frontmatter.lastEdited ? lastEdited : null}
        isBlogPage={isBlogPage}
        content={children}
        {...props}
      />
    )
  }

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

export const query = graphql`
  query PageBySlug($id: String!) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        lastEdited
        isPro
      }
      fields {
        slug
      }
    }
  }
`

export default Template
