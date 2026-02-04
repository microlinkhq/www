import { useStaticQuery, graphql } from 'gatsby'
import map from 'lodash/map'
import get from 'dlv'

export const useBlogIndex = () => {
  const { allMdx, allAuthorsYaml } = useStaticQuery(
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
                description
                date
                authors
              }
            }
          }
        }
        allAuthorsYaml {
          nodes {
            key
            name
            avatar
          }
        }
      }
    `
  )

  const authorsByKey = new Map(
    get(allAuthorsYaml, 'nodes', []).map(author => [author.key, author])
  )

  return map(get(allMdx, 'edges'), ({ node }) => {
    const authorKeys = node.frontmatter.authors || []
    const authorAvatars = authorKeys
      .map(key => authorsByKey.get(key)?.avatar)
      .filter(Boolean)
    const authorNames = authorKeys
      .map(key => authorsByKey.get(key)?.name)
      .filter(Boolean)
    return {
      ...node.fields,
      ...node.frontmatter,
      authorAvatars,
      authorNames,
      excerpt: node.frontmatter.description || node.excerpt
    }
  }).sort((a, b) => new Date(b.date) - new Date(a.date))
}
