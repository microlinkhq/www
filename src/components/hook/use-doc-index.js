import { useStaticQuery, graphql } from 'gatsby'
import map from 'lodash/map'
import get from 'dlv'

export const useDocIndex = () => {
  const { allMdx } = useStaticQuery(
    graphql`
      query DocIndexData {
        allMdx(filter: { fields: { slug: { regex: "//docs//" } } }) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  return map(get(allMdx, 'edges'), ({ node }) => ({
    ...node.fields,
    ...node.frontmatter
  })).sort((a, b) => new Date(b.date) - new Date(a.date))
}
