import { useWindowSize } from 'components/hook/use-window-size'
import React, { lazy, Suspense } from 'react'
import { colors } from 'theme'

// Lazy load react-confetti to reduce initial bundle size
const BaseConfetti = lazy(() => import('react-confetti'))

const ConfettiContent = () => {
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

const Confetti = () => {
  return (
    <Suspense fallback={null}>
      <ConfettiContent />
    </Suspense>
  )
}

export default Confetti
