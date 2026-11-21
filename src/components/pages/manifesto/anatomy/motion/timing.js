export const easeInOut = t =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export const between = (value, from, to) =>
  Math.min(1, Math.max(0, (value - from) / (to - from)))

export const translate = ([vx, vy], amount) =>
  `translate(${(vx * amount).toFixed(2)} ${(vy * amount).toFixed(2)})`

export const translate2 = (first, firstAmount, second, secondAmount) =>
  `translate(${(first[0] * firstAmount + second[0] * secondAmount).toFixed(
    2
  )} ${(first[1] * firstAmount + second[1] * secondAmount).toFixed(2)})`

export const cycleOf = (time, period) => {
  const cycle = Math.floor(time / period)
  return { cycle, phase: time / period - cycle }
}

export const writeText = (node, text) => {
  if (node && node.textContent !== text) node.textContent = text
}

const invert = ([a, b, c, d]) => {
  const det = a * d - b * c
  return [d / det, -b / det, -c / det, a / det]
}

const multiply = ([a, b, c, d], [e, f, g, h]) => [
  a * e + c * f,
  b * e + d * f,
  a * g + c * h,
  b * g + d * h
]

export const planeRotation = (first, second) => {
  const screen = [first[0], first[1], second[0], second[1]]
  const back = invert(screen)
  return ([px, py], angle) => {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const [a, b, c, d] = multiply(multiply(screen, [cos, sin, -sin, cos]), back)
    const e = px - (a * px + c * py)
    const f = py - (b * px + d * py)
    return `matrix(${[a, b, c, d, e, f]
      .map(value => value.toFixed(4))
      .join(' ')})`
  }
}

export const translate3 = ([x, y, z], [dx, dy, dz]) =>
  `translate(${(x[0] * dx + y[0] * dy + z[0] * dz).toFixed(2)} ${(
    x[1] * dx +
    y[1] * dy +
    z[1] * dz
  ).toFixed(2)})`
