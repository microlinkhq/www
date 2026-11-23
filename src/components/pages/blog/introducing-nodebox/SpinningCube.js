import React, { useRef } from 'react'
import { theme } from 'theme'

import Box from 'components/elements/Box'

import {
  CUBE_ANIMATION,
  CUBE_FRAMES,
  CUBE_QUARTER_TURN_MS,
  CUBE_TOP_COLOR
} from './cube-frames'
import { useCubeMotion } from './use-cube-motion'

const TURN_DURATION = `${CUBE_QUARTER_TURN_MS}ms`
const [RESTING] = CUBE_FRAMES

const Turn = ({ attribute, values }) => (
  <animate
    attributeName={attribute}
    begin='indefinite'
    values={values}
    dur={TURN_DURATION}
    repeatCount='indefinite'
  />
)

export const SpinningCube = () => {
  const ref = useRef(null)
  const { playing, toggle } = useCubeMotion(ref)

  return (
    <Box
      css={theme({
        display: 'flex',
        justifyContent: 'center',
        py: [4, 4, 5, 5]
      })}
    >
      <Box
        as='button'
        type='button'
        aria-label={
          playing ? 'Pause the Nodebox cube' : 'Play the Nodebox cube'
        }
        onClick={toggle}
        css={theme({
          display: 'flex',
          p: 0,
          border: 0,
          bg: 'transparent',
          cursor: 'pointer'
        })}
      >
        <Box
          as='svg'
          ref={ref}
          viewBox='0 0 24 24'
          aria-hidden='true'
          css={theme({ width: ['128px', '160px', '192px', '192px'] })}
        >
          {RESTING.sides.map((side, index) => (
            <path key={index} d={side.d} fill={side.fill}>
              <Turn attribute='d' values={CUBE_ANIMATION.sides[index].d} />
              <Turn
                attribute='fill'
                values={CUBE_ANIMATION.sides[index].fill}
              />
            </path>
          ))}
          <path d={RESTING.top} fill={CUBE_TOP_COLOR}>
            <Turn attribute='d' values={CUBE_ANIMATION.top} />
          </path>
        </Box>
      </Box>
    </Box>
  )
}
