import { useStaticQuery, graphql } from 'gatsby'
import get from 'dlv'

export const useChangelogLatest = () => {
  const data = useStaticQuery(
    graphql`
      query ChangelogLatest {
        mdx(fields: { slug: { eq: "/fragments/changelog/" } }) {
          fields {
            latestEntry {
              product
              description
            }
          }
        }
      }
    `
  )

  return get(data, 'mdx.fields.latestEntry') || null
}
