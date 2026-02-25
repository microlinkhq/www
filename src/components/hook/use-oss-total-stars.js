import { useStaticQuery, graphql } from 'gatsby'

export const useOssTotalStars = () => {
  const { allOssJson } = useStaticQuery(
    graphql`
      query OssTotalStars {
        allOssJson {
          nodes {
            stars
          }
        }
      }
    `
  )

  return allOssJson.nodes.reduce(
    (total, repository) => total + (repository.stars || 0),
    0
  )
}
