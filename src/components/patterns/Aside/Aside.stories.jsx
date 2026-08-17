import React from 'react'
import { Story } from 'story'
import Aside from './Aside'

const ROUTES_SDK = [
  {
    name: 'Getting Started',
    posts: [
      {
        name: 'Overview',
        href: '/docs/sdk-legacy/getting-started/overview/'
      },
      {
        name: 'Considerations',
        href: '/docs/sdk-legacy/getting-started/considerations/'
      }
    ]
  },
  {
    name: 'Integrations',
    posts: [
      {
        name: 'React',
        href: '/docs/sdk-legacy/integrations/react/'
      },
      {
        name: 'Vanilla',
        href: '/docs/sdk-legacy/integrations/vanilla/'
      },
      {
        name: 'Jekyll',
        href: '/docs/sdk-legacy/integrations/jekyll/'
      }
    ]
  },
  {
    name: 'API Parameters',
    posts: [
      {
        name: 'url',
        href: '/docs/sdk-legacy/parameters/url/'
      },
      {
        name: 'apiKey',
        href: '/docs/sdk-legacy/parameters/api-key/'
      },
      {
        name: 'setData',
        href: '/docs/sdk-legacy/parameters/set-data/'
      },
      {
        name: 'contrast',
        href: '/docs/sdk-legacy/parameters/contrast/'
      },
      {
        name: 'media',
        href: '/docs/sdk-legacy/parameters/media/'
      },
      {
        name: 'direction',
        href: '/docs/sdk-legacy/parameters/direction/'
      },
      {
        name: 'size',
        href: '/docs/sdk-legacy/parameters/size/'
      },
      {
        name: 'media',
        posts: [
          {
            name: 'controls',
            href: '/docs/sdk-legacy/parameters/media/controls/'
          },
          {
            name: 'muted',
            href: '/docs/sdk-legacy/parameters/media/muted/'
          },
          {
            name: 'loop',
            href: '/docs/sdk-legacy/parameters/media/loop/'
          },
          {
            name: 'autoPlay',
            href: '/docs/sdk-legacy/parameters/media/auto-play/'
          }
        ]
      }
    ]
  }
]

const SDK = 'SDK'
const API = 'API'

const ROUTES_PATH = [
  {
    name: 'Getting Started',
    posts: [
      {
        name: 'Overview',
        href: '/docs/api/getting-started/overview'
      }
    ]
  }
]

const routes = {
  [SDK]: ROUTES_SDK,
  [API]: ROUTES_PATH
}

export default { title: 'Patterns/Aside' }

export const Default = () => (
  <Story name='Aside'>
    <Aside routes={routes} activeRouteName={SDK} />
  </Story>
)
