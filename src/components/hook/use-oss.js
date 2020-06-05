import { useStaticQuery, graphql } from 'gatsby'
import map from 'lodash/map'

export const useOss = () => {
  const { allOssJson } = useStaticQuery(
    graphql`
      query OssData {
        allOssJson {
          edges {
            node {
              ...OssFragment
            }
          }
        }
      }
    `
  )

  return map(allOssJson.edges, 'node')
}
