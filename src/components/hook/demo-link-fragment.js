import { graphql } from 'gatsby'

export const demolinkFragment = graphql`
  fragment DemoLinkFragment on DemoLinksJson {
    id
    data {
      lang
      author
      title
      publisher
      image {
        url
        width
        height
        type
        size
        size_pretty
        background_color
        color
        alternative_color
      }
      description
      iframe {
        html
        scripts {
          async
          defer
          crossorigin
          src
          charset
        }
      }
      audio {
        url
        type
        size
        size_pretty
        duration
        duration_pretty
      }
      date
      video {
        url
        width
        height
        type
        size
        size_pretty
        duration
        duration_pretty
      }
      logo {
        url
        width
        height
        type
        size
        size_pretty
        background_color
        color
        alternative_color
      }
      url
    }
  }
`
