import { useStaticQuery, graphql } from 'gatsby'
import map from 'lodash/map'

export const useFeaturesMeta = () => {
  const { allFeaturesMetaYaml } = useStaticQuery(
    graphql`
      query FeaturesMetaData {
        allFeaturesMetaYaml {
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
  return map(allFeaturesMetaYaml.edges, 'node')
}
