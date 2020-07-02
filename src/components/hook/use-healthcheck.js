import { useStaticQuery, graphql } from 'gatsby'

export const useHealthcheck = () => {
  const { allHealthcheckJson } = useStaticQuery(
    graphql`
      query HealtcheckData {
        allHealthcheckJson {
          edges {
            node {
              ...HealthcheckFragment
            }
          }
        }
      }
    `
  )

  return allHealthcheckJson.edges[0].node
}
