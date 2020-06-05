import { graphql } from 'gatsby'

export const ossFragment = graphql`
  fragment OssFragment on OssJson {
    description
    issues
    language
    license
    name
    size
    slug
    stars
    url
  }
`
