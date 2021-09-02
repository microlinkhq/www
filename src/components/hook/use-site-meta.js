import { useStaticQuery, graphql } from 'gatsby'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            author
            canonicalUrl
            description
            headline
            image
            logo
            name
            paymentApiKey
            paymentEndpoint
            siteUrl
            stripeKey
            twitter
          }
        }
      }
    `
  )
  return site.siteMetadata
}
