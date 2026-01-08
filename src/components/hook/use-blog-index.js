import { useStaticQuery, graphql } from 'gatsby'
import map from 'lodash/map'
import get from 'dlv'

export const useBlogIndex = () => {
  const { allMdx } = useStaticQuery(
    graphql`
      query BlogIndexData {
        allMdx(filter: { fields: { slug: { regex: "/blog/" } } }) {
          edges {
            node {
              excerpt(pruneLength: 240)
              fields {
                slug
              }
              frontmatter {
                title
                date
              }
            }
          }
        }
      }
    `
  )

  return map(get(allMdx, 'edges'), ({ node }) => ({
    ...node.fields,
    ...node.frontmatter,
    excerpt: node.excerpt
  })).sort((a, b) => new Date(b.date) - new Date(a.date))
}
