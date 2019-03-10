import { useStaticQuery, graphql } from 'gatsby'

export const useDefaultDemoLink = () => {
  const { allDemoLinksJson } = useStaticQuery(graphql`
    query DefaultDemoLinkData {
      allDemoLinksJson(filter: { brand: { eq: "Twitter" } }) {
        edges {
          node {
            ...DemoLinkFragment
          }
        }
      }
    }
  `)

  return allDemoLinksJson.edges[0].node
}
