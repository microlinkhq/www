export const humanList = array =>
  array.length > 1
    ? `${array.slice(0, -1).join(', ')} & ${array[array.length - 1]}`
    : array[0]
