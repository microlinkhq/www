import { useStaticQuery, graphql } from 'gatsby'

export const useCheckly = () => {
  const { allChecklyJson } = useStaticQuery(
    graphql`
      query ChecklyData {
        allChecklyJson {
          edges {
            node {
              ...ChecklyFragment
            }
          }
        }
      }
    `
  )

  return allChecklyJson.edges[0].node
}
