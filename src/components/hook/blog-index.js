import { useStaticQuery, graphql } from 'gatsby'
import { chain } from 'lodash'

export const useBlogIndex = () => {
  const { allJavascriptFrontmatter } = useStaticQuery(
    graphql`
      query BlogIndexData {
        allJavascriptFrontmatter(
          filter: { frontmatter: { static: { ne: true } } }
        ) {
          edges {
            node {
              frontmatter {
                title
                date
                static
                slug
              }
            }
          }
        }
      }
    `
  )

  return chain(allJavascriptFrontmatter.edges)
    .map('node.frontmatter')
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .value()
}
