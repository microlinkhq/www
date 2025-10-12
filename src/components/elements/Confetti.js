import { useWindowSize } from 'components/hook/use-window-size'
import BaseConfetti from 'react-confetti'
import { colors } from 'theme'
import React from 'react'

const Confetti = () => {
  const size = useWindowSize()
  return (
    <BaseConfetti
      colors={[
        colors.red5,
        colors.pink5,
        colors.grape5,
        colors.violet5,
        colors.indigo5,
        colors.blue5,
        colors.cyan5,
        colors.teal5,
        colors.green5,
        colors.lime5,
        colors.yellow5,
        colors.orange5
      ]}
      {...size}
    />
  )
}

export default Confetti
