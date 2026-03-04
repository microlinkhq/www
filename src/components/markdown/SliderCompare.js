import React from 'react'

import {
  ReactCompareSlider,
  ReactCompareSliderImage
} from 'react-compare-slider'

import { withContainer } from 'helpers/hoc/with-container'

export const SliderCompare = withContainer(({ before, after }) => (
  <ReactCompareSlider
    itemOne={
      <ReactCompareSliderImage
        src={before.src}
        srcSet={before.srcSet}
        alt={before.alt}
      />
    }
    itemTwo={
      <ReactCompareSliderImage
        src={after.src}
        srcSet={after.srcSet}
        alt={after.alt}
      />
    }
  />
))
