import { graphql } from 'gatsby'

export const healthcheckFragment = graphql`
  fragment HealthcheckFragment on HealthcheckJson {
    iframe {
      avg
      avg_pretty
      p95
      p95_pretty
    }
    insights {
      avg_pretty
      avg
      p95
      p95_pretty
    }
    meta {
      avg
      avg_pretty
      p95
      p95_pretty
    }
    pdf {
      avg
      avg_pretty
      p95
      p95_pretty
    }
    screenshot {
      avg
      avg_pretty
      p95
      p95_pretty
    }
    audio {
      avg
      avg_pretty
      p95
      p95_pretty
    }
    video {
      avg
      avg_pretty
      p95
      p95_pretty
    }
  }
`
