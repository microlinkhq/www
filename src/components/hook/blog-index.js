import { useStaticQuery, graphql } from 'gatsby'
import { chain } from 'lodash'

export const useBlogIndex = () => {
  const { allJavascriptFrontmatter } = useStaticQuery(
    graphql`
      query BlogIndexData {
        allJavascriptFrontmatter {
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
    .filter(({ static: isStatic }) => isStatic !== true)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .value()
}
