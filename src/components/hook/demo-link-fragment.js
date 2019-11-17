import { graphql } from 'gatsby'

export const demolinkFragment = graphql`
  fragment DemoLinkFragment on DemoLinksJson {
    brand
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
      iframe
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
