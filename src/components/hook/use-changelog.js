import { useStaticQuery, graphql } from 'gatsby'
import map from 'lodash/map'

export const useChangelog = () => {
  const { allChangelogYaml } = useStaticQuery(
    graphql`
      query ChangelogData {
        allChangelogYaml {
          edges {
            node {
              date
              notes
            }
          }
        }
      }
    `
  )
  return map(allChangelogYaml.edges, 'node')
}
