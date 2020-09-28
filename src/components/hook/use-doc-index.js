import { useStaticQuery, graphql } from 'gatsby'
import map from 'lodash/map'
import get from 'dlv'

export const useDocIndex = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query DocIndexData {
        allMarkdownRemark(filter: { fields: { slug: { regex: "//docs//" } } }) {
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

  return map(get(allMarkdownRemark, 'edges'), ({ node }) => ({
    ...node.fields,
    ...node.frontmatter
  })).sort((a, b) => new Date(b.date) - new Date(a.date))
}
