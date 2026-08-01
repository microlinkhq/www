export const formatNumber = n => Number(n).toLocaleString('en-US')

const COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1
})

export const formatCompactNumber = n =>
  COMPACT_NUMBER_FORMATTER.format(n).toLowerCase()
