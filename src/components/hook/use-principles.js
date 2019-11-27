import { useStaticQuery, graphql } from 'gatsby'
import map from 'lodash/map'

export const usePrinciples = () => {
  const { allPrinciplesYaml } = useStaticQuery(
    graphql`
      query PrinciplesData {
        allPrinciplesYaml {
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
  return map(allPrinciplesYaml.edges, 'node')
}
