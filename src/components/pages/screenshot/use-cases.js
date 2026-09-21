import { theme } from 'theme'
import React from 'react'

import { ProductUseCases } from 'components/patterns/UseCaseStory'

import { Subhead } from './shared'

export const UseCases = () => (
  <ProductUseCases
    vertical='website-screenshot'
    title={
      <Subhead css={theme({ width: '100%', textAlign: 'left' })}>
        One screenshot problem,{' '}
        <span
          css={theme({
            display: 'block',
            color: 'red6',
            width: '100%',
            textAlign: 'left'
          })}
        >
          one recipe.
        </span>
      </Subhead>
    }
    caption='Mobile viewports, cookie banners, single elements, traffic spikes, proxies and more. Each use case shows the exact options that solve it and the code to run.'
  />
)
