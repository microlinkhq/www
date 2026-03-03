import styled from 'styled-components'
import Box from 'components/elements/Box'
import React, { useEffect, useMemo, useRef } from 'react'
import { colors } from 'theme'

const INTERNAL_PROPS = [
  'squareSize',
  'gridGap',
  'flickerChance',
  'color',
  'maxOpacity'
]

const SQUARE_SIZE = 4
const GRID_GAP = 6
const FLICKER_CHANCE = 0.3
const GRID_COLOR = colors.gray5
const MAX_OPACITY = 0.3

const StyledSquareBackground = styled(Box).withConfig({
  shouldForwardProp: prop => !INTERNAL_PROPS.includes(prop)
})`
  position: relative;
  min-height: 100vh;
  z-index: 0;

  canvas {
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
  }
`

const getRgbaPrefix = color => {
  if (typeof document === 'undefined') return 'rgba(0, 0, 0,'

  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 1
  const context = canvas.getContext('2d')

  if (!context) return 'rgba(0, 0, 0,'

  context.fillStyle = color
  context.fillRect(0, 0, 1, 1)

  const [red, green, blue] = Array.from(context.getImageData(0, 0, 1, 1).data)

  return `rgba(${red}, ${green}, ${blue},`
}

const SquareBackground = ({ children, ...props }) => {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const gridRef = useRef(null)
  const frameRef = useRef()
  const inViewRef = useRef(true)

  const rgbaPrefix = useMemo(() => getRgbaPrefix(GRID_COLOR), [])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const drawGrid = () => {
      const grid = gridRef.current
      if (!grid) return

      const { cols, rows, squares, dpr } = grid

      context.clearRect(0, 0, canvas.width, canvas.height)

      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          const opacity = squares[col * rows + row]
          context.fillStyle = `${rgbaPrefix}${opacity})`
          context.fillRect(
            col * (SQUARE_SIZE + GRID_GAP) * dpr,
            row * (SQUARE_SIZE + GRID_GAP) * dpr,
            SQUARE_SIZE * dpr,
            SQUARE_SIZE * dpr
          )
        }
      }
    }

    const updateCanvas = () => {
      const { width, height } = container.getBoundingClientRect()
      const canvasWidth = Math.max(1, Math.floor(width))
      const canvasHeight = Math.max(1, Math.floor(height))
      const dpr = window.devicePixelRatio || 1
      const cols = Math.ceil(canvasWidth / (SQUARE_SIZE + GRID_GAP))
      const rows = Math.ceil(canvasHeight / (SQUARE_SIZE + GRID_GAP))
      const squares = new Float32Array(cols * rows)

      canvas.width = canvasWidth * dpr
      canvas.height = canvasHeight * dpr
      canvas.style.width = `${canvasWidth}px`
      canvas.style.height = `${canvasHeight}px`

      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * MAX_OPACITY
      }

      gridRef.current = { cols, rows, squares, dpr }
      drawGrid()
    }

    const updateSquares = deltaTime => {
      const grid = gridRef.current
      if (!grid) return

      for (let i = 0; i < grid.squares.length; i++) {
        if (Math.random() < FLICKER_CHANCE * deltaTime) {
          grid.squares[i] = Math.random() * MAX_OPACITY
        }
      }
    }

    const stop = () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = undefined
      }
    }

    let lastTime = 0
    const tick = timestamp => {
      if (!inViewRef.current) return
      const deltaTime = (timestamp - lastTime) / 1000
      lastTime = timestamp

      updateSquares(deltaTime)
      drawGrid()

      frameRef.current = window.requestAnimationFrame(tick)
    }

    const start = () => {
      if (!inViewRef.current || frameRef.current) return
      lastTime = performance.now()
      frameRef.current = window.requestAnimationFrame(tick)
    }

    updateCanvas()

    let resizeObserver
    if ('ResizeObserver' in window) {
      resizeObserver = new window.ResizeObserver(updateCanvas)
      resizeObserver.observe(container)
    }

    let intersectionObserver
    if ('IntersectionObserver' in window) {
      intersectionObserver = new window.IntersectionObserver(([entry]) => {
        inViewRef.current = entry.isIntersecting

        if (entry.isIntersecting) {
          start()
        } else {
          stop()
        }
      })

      intersectionObserver.observe(container)
    }

    start()

    return () => {
      stop()
      if (resizeObserver) resizeObserver.disconnect()
      if (intersectionObserver) intersectionObserver.disconnect()
    }
  }, [rgbaPrefix])

  return (
    <StyledSquareBackground ref={containerRef} {...props}>
      <canvas ref={canvasRef} />
      {children}
    </StyledSquareBackground>
  )
}

export default SquareBackground
