import { useStaticQuery, graphql } from 'gatsby'
import chain from 'lodash/chain'
import get from 'lodash/get'

export const useBlogIndex = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query BlogIndexData {
        allMarkdownRemark(filter: { fields: { slug: { regex: "//blog//" } } }) {
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

  return chain(get(allMarkdownRemark, 'edges'))
    .map(({ node }) => ({ ...node.fields, ...node.frontmatter }))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .value()
}
