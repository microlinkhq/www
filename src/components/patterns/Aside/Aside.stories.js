import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import Aside from './'

const ROUTES_SDK = [
  {
    name: 'Getting Started',
    posts: [
      {
        name: 'Overview',
        href: '/docs/sdk/getting-started/overview/'
      },
      {
        name: 'Considerations',
        href: '/docs/sdk/getting-started/considerations/'
      }
    ]
  },
  {
    name: 'Integrations',
    posts: [
      {
        name: 'React',
        href: '/docs/sdk/integrations/react/'
      },
      {
        name: 'Vanilla',
        href: '/docs/sdk/integrations/vanilla/'
      },
      {
        name: 'Jekyll',
        href: '/docs/sdk/integrations/jekyll/'
      }
    ]
  },
  {
    name: 'API Parameters',
    posts: [
      {
        name: 'url',
        href: '/docs/sdk/api-parameters/url/'
      },
      {
        name: 'apiKey',
        href: '/docs/sdk/api-parameters/api-key/'
      },
      {
        name: 'setData',
        href: '/docs/sdk/api-parameters/set-data/'
      },
      {
        name: 'contrast',
        href: '/docs/sdk/api-parameters/contrast/'
      },
      {
        name: 'media',
        href: '/docs/sdk/api-parameters/media/'
      },
      {
        name: 'direction',
        href: '/docs/sdk/api-parameters/direction/'
      },
      {
        name: 'size',
        href: '/docs/sdk/api-parameters/size/'
      },
      {
        name: 'media',
        posts: [
          {
            name: 'controls',
            href: '/docs/sdk/api-parameters/media/controls/'
          },
          {
            name: 'muted',
            href: '/docs/sdk/api-parameters/media/muted/'
          },
          {
            name: 'loop',
            href: '/docs/sdk/api-parameters/media/loop/'
          },
          {
            name: 'autoPlay',
            href: '/docs/sdk/api-parameters/media/auto-play/'
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

storiesOf('Patterns', module).add('Aside', () => (
  <Story name='Aside'>
    <Aside routes={routes} activeRouteName={SDK} />
  </Story>
))
