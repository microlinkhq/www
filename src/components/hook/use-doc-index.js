import { useStaticQuery, graphql } from 'gatsby'
import chain from 'lodash/chain'
import get from 'lodash/get'

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

  return chain(get(allMarkdownRemark, 'edges'))
    .map(({ node }) => ({ ...node.fields, ...node.frontmatter }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .value()
}
