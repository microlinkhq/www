import { useStaticQuery, graphql } from 'gatsby'

export const useAnalytics = () => {
  const { allAnalyticsJson } = useStaticQuery(
    graphql`
      query AnalyticsData {
        allAnalyticsJson {
          edges {
            node {
              ...AnalyticsFragment
            }
          }
        }
      }
    `
  )

  return allAnalyticsJson.edges[0].node
}
