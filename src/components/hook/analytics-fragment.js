import { graphql } from 'gatsby'

export const analyticsFragment = graphql`
  fragment AnalyticsFragment on AnalyticsJson {
    reqs
    reqs_pretty
    bytes
    bytes_pretty
  }
`
