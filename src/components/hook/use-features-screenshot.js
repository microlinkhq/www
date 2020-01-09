import { useStaticQuery, graphql } from 'gatsby'
import map from 'lodash/map'

export const useFeaturesScreenshot = () => {
  const { allFeaturesScreenshotYaml } = useStaticQuery(
    graphql`
      query FeaturesScreenshotData {
        allFeaturesScreenshotYaml {
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
  return map(allFeaturesScreenshotYaml.edges, 'node')
}
