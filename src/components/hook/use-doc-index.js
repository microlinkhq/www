import { useStaticQuery, graphql } from 'gatsby'
import { chain } from 'lodash'
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

  return chain(get(allMarkdownRemark, 'edges'))
    .map(({ node }) => ({ ...node.fields, ...node.frontmatter }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .value()
}
