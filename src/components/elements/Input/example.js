export const exampleHint = example => `e.g., ${example}`

export const shouldFillExample = (event, example) =>
  Boolean(example) &&
  event.key === 'Tab' &&
  !event.shiftKey &&
  !event.altKey &&
  !event.ctrlKey &&
  !event.metaKey &&
  event.currentTarget.value === ''

export const fillInput = (input, value) => {
  const setValue = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(input),
    'value'
  ).set
  setValue.call(input, value)
  input.dispatchEvent(new Event('input', { bubbles: true }))
}

export const applyExampleKey = (event, example, onKeyDown) => {
  if (shouldFillExample(event, example)) {
    event.preventDefault()
    fillInput(event.currentTarget, example)
  }
  onKeyDown?.(event)
}
