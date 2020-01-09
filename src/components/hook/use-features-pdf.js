import { useStaticQuery, graphql } from 'gatsby'
import map from 'lodash/map'

export const useFeaturesPdf = () => {
  const { allFeaturesPdfYaml } = useStaticQuery(
    graphql`
      query FeaturesPdfData {
        allFeaturesPdfYaml {
          edges {
            node {
              title
              description
            }
          }
        }
      }
    `
  )
  return map(allFeaturesPdfYaml.edges, 'node')
}
