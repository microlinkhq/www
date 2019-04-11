import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import Aside from './'

const paths = [
  {
    name: 'Getting Started',
    posts: [
      {
        name: 'Introduction to Now',
        href: '/docs/v1/getting-started/introduction-to-now'
      },
      {
        name: 'Deployment',
        href: '/docs/v1/getting-started/deployment'
      },
      {
        name: 'Assign a Domain Name',
        href: '/docs/v1/getting-started/assign-a-domain-name'
      },
      {
        name: 'Logs',
        href: '/docs/v1/getting-started/logs'
      },
      {
        name: 'Environment Variables',
        href: '/docs/v1/getting-started/environment-variables'
      },
      {
        name: 'Secrets',
        href: '/docs/v1/getting-started/secrets'
      },
      {
        name: 'Scaling',
        href: '/docs/v1/getting-started/scaling'
      },
      {
        name: "What's Next",
        href: '/docs/v1/getting-started/whats-next'
      }
    ]
  },

  {
    name: 'Clients',
    posts: [
      {
        name: 'Now CLI',
        href: '/docs/v1/clients/now-cli'
      }
    ]
  },

  {
    name: 'Static Deployments',
    posts: [
      {
        name: 'Introduction & Deploying',
        href: '/docs/v1/static-deployments/introduction-and-deploying'
      },
      {
        name: 'Configuration',
        href: '/docs/v1/static-deployments/configuration'
      },
      {
        name: 'Builds',
        posts: [
          {
            name: 'Building with Now',
            href: '/docs/v1/static-deployments/builds/building-with-now'
          }
        ]
      }
    ]
  },

  {
    name: 'Dynamic Deployments',
    posts: [
      {
        name: 'Docker',
        href: '/docs/v1/deployment-types/docker'
      },
      {
        name: 'Node.js',
        href: '/docs/v1/deployment-types/node'
      }
    ]
  },

  {
    name: 'Features',
    posts: [
      {},
      {
        name: 'Global Scaling',
        href: '/docs/v1/features/scaling'
      },
      {
        name: 'DNS Management',
        href: '/docs/v1/features/dns'
      },
      {
        name: 'CDN',
        href: '/docs/v1/features/cdn'
      },
      {
        name: 'Build-Time Env and Secrets',
        href: '/docs/v1/features/build-env-and-secrets'
      },
      {
        name: 'Run-Time Env and Secrets',
        href: '/docs/v1/features/env-and-secrets'
      },
      {
        name: 'Configuration',
        href: '/docs/v1/features/configuration'
      },
      {
        name: 'SSL Certificates',
        href: '/docs/v1/features/certs'
      },
      {
        name: 'Private NPM',
        href: '/docs/v1/features/private-npm'
      },
      {
        name: 'Git Repositories',
        href: '/docs/v1/features/repositories'
      },
      {}
    ]
  },

  {
    name: 'Integrations',
    posts: [
      {
        name: 'Now for GitHub',
        href: '/docs/v1/integrations/now-for-github'
      }
    ]
  },

  {
    name: 'Guides',
    posts: [
      {
        name: 'App Lifecycle & Scalability',
        href: '/docs/v1/guides/app-lifecycle-and-scalability'
      },
      {
        name: 'Migrate Your App',
        href: '/docs/v1/guides/migrate-your-app'
      },
      {
        name: 'How to Use Cloudflare',
        href: '/docs/v1/guides/how-to-use-cloudflare'
      },
      {
        name: 'Updating Now CLI',
        href: '/docs/v1/guides/updating-now-cli'
      },
      {
        name: 'Redirect',
        href: '/docs/v1/examples/redirect'
      },
      {
        name: 'Continuous Integration',
        posts: [
          {
            name: 'Travis CI',
            href: '/docs/v1/continuous-integration/travis'
          }
        ]
      }
    ]
  },

  {
    name: 'Examples',
    posts: [
      {
        name: 'JSON API',
        href: '/docs/v1/examples/json-api'
      },
      {
        name: 'Static Website',
        href: '/docs/v1/examples/static'
      },
      {
        name: 'Next.js',
        href: '/docs/v1/examples/next'
      },
      {
        name: 'Slash Command for Slack',
        href: '/docs/v1/examples/slack-slash'
      },
      {
        name: 'Realtime Chat',
        href: '/docs/v1/examples/chat'
      },
      {
        name: 'GraphQL App',
        href: '/docs/v1/examples/graphql'
      },
      {
        name: 'Create React App',
        href: '/docs/v1/examples/create-react-app'
      }
    ]
  },

  {
    name: 'Other',
    posts: [
      {
        name: 'Support Channels',
        href: '/docs/v1/other/support-channels'
      },
      {
        name: 'FAQ',
        href: '/docs/v1/other/faq'
      },
      {
        name: 'Restrictions',
        href: '/docs/v1/other/restrictions'
      }
    ]
  }
]

storiesOf('Patterns', module).add('Aside', () => (
  <Story name='Aside'>
    <Aside children={paths} />
  </Story>
))
