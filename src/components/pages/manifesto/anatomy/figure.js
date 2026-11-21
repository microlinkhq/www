import React, { useEffect, useRef, useState } from 'react'

import Box from 'components/elements/Box'

import { useFigureTimeline } from './use-figure-timeline'
import { watchFigure } from './watch-figure'

const PlateShell = ({ figure }) => (
  <figure className='iso-figure'>
    <div className='iso-plate'>
      <div className='iso-stage'>
        <svg
          className='iso-svg'
          viewBox={`0 0 ${figure.width} ${figure.height}`}
          role='img'
          aria-label={figure.label}
        />
      </div>
    </div>
  </figure>
)

const useFigureSource = (ref, load) => {
  const [source, setSource] = useState(null)
  useEffect(() => watchFigure(ref.current, load, setSource), [ref, load])
  return source
}

export const AnatomyFigure = ({ figure }) => {
  const ref = useRef(null)
  const source = useFigureSource(ref, figure.load)
  useFigureTimeline(ref, {
    source,
    restShare: figure.restShare,
    createPose: figure.createPose
  })
  return source
    ? (
      <Box
        ref={ref}
        className='iso manifesto-figure'
        data-theme='light'
        dangerouslySetInnerHTML={{ __html: source.html }}
      />
      )
    : (
      <Box ref={ref} className='iso manifesto-figure' data-theme='light'>
        <PlateShell figure={figure} />
      </Box>
      )
}
