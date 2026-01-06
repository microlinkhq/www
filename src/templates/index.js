import { getActiveRouteName } from 'components/patterns/Aside/constants'
import { useSiteMetadata } from 'components/hook/use-site-meta'
import Meta from 'components/elements/Meta/Meta'
import { cdnUrl } from 'helpers/cdn-url'
import React from 'react'

import PageTemplate from './page'
import DocTemplate from './doc'

const HeadDoc = ({ location, pageContext }) => {
  const { name } = useSiteMetadata()
  const activeRouteName = getActiveRouteName(location)
  const frontmatter = pageContext.frontmatter || {}
  // Validate date to avoid "Invalid time value" errors
  const lastEdited = pageContext.lastEdited
  const validDate = lastEdited && !isNaN(new Date(lastEdited).getTime()) ? lastEdited : undefined

  return (
    <Meta
      name='Microlink Docs'
      image={cdnUrl('banner/docs.jpeg')}
      title={`${name} ${activeRouteName}: ${frontmatter.title || ''}`}
      date={validDate}
    />
  )
}

export const Head = ({ pageContext, location }) => {
  const frontmatter = pageContext.frontmatter || {}

  return pageContext.isDocPage
    ? HeadDoc({ location, pageContext })
    : <Meta {...frontmatter} />
}

const Template = ({ pageContext, children, ...props }) => {
  const { isDocPage, isBlogPage, lastEdited, githubUrl, frontmatter = {} } = pageContext
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

export default Template
