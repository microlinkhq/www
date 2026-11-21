import { useEffect } from 'react'

const IDLE_RESUME_MS = 3600
const SCRUB_SECONDS = 0.35
const LONGEST_FRAME = 1 / 30
const SETTLED = 0.001
const KEY_STEPS = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }
const STEPS_PER_PERIOD = 4

const clamp = (value, low, high) => Math.min(high, Math.max(low, value))

export const useFigureTimeline = (ref, { source, restShare, createPose }) => {
  useEffect(() => {
    const root = ref.current
    if (!root || !source) return undefined
    const { period } = source.motion
    const restTime = period * restShare
    const stage = root.querySelector('.iso-stage')
    const pose = createPose(source.motion)(root)
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')

    let time = 0
    let target = 0
    let touring = true
    let visible = false
    let frame = 0
    let last = 0
    let idleTimer = 0

    const tick = now => {
      const dt = last ? Math.min((now - last) / 1000, LONGEST_FRAME) : 1 / 60
      last = now
      if (touring) {
        time += dt
        target = time
      } else {
        time += (target - time) * (1 - Math.exp(-dt / SCRUB_SECONDS))
        if (Math.abs(target - time) < SETTLED) time = target
      }
      pose(time)
      const settled = !touring && time === target
      frame = visible && !settled ? window.requestAnimationFrame(tick) : 0
    }

    const run = () => {
      if (frame || !visible || still.matches) return
      last = 0
      frame = window.requestAnimationFrame(tick)
    }

    const steer = next => {
      touring = false
      target = Math.max(0, next)
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        touring = !still.matches
        run()
      }, IDLE_RESUME_MS)
      if (still.matches) {
        time = target
        pose(time)
      } else {
        run()
      }
    }

    const onPointerMove = event => {
      const box = stage.getBoundingClientRect()
      const share = clamp((event.clientX - box.left) / box.width, 0, 0.999)
      steer(Math.floor(target / period) * period + share * period)
    }

    const onKeyDown = event => {
      const direction = KEY_STEPS[event.key]
      if (!direction) return
      event.preventDefault()
      steer(target + (direction * period) / STEPS_PER_PERIOD)
    }

    const observer = new window.IntersectionObserver(
      entries => {
        visible = entries[entries.length - 1].isIntersecting
        if (visible) run()
      },
      { rootMargin: '120px 0px' }
    )

    if (still.matches) {
      time = restTime
      target = restTime
      touring = false
    }
    pose(time)
    observer.observe(stage)
    stage.addEventListener('pointermove', onPointerMove)
    stage.addEventListener('keydown', onKeyDown)

    return () => {
      observer.disconnect()
      stage.removeEventListener('pointermove', onPointerMove)
      stage.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(idleTimer)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [ref, source, restShare, createPose])
}
