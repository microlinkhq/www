import { useStaticQuery, graphql } from 'gatsby'
import map from 'lodash/map'
import get from 'dlv'

export const useBlogIndex = () => {
  const { allMdx } = useStaticQuery(
    graphql`
      query BlogIndexData {
        allMdx(filter: { fields: { slug: { regex: "//blog//" } } }) {
          edges {
            node {
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
    ...node.frontmatter
  })).sort((a, b) => new Date(b.date) - new Date(a.date))
}
