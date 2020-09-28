import { useStaticQuery, graphql } from 'gatsby'
import map from 'lodash/map'

export const useFeatures = () => {
  const { allFeaturesYaml } = useStaticQuery(
    graphql`
      query FeaturesData {
        allFeaturesYaml {
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
  return map(allFeaturesYaml.edges, 'node')
}
