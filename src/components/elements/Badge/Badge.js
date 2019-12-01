import styled from 'styled-components'
import theme from 'theme'

const Badge = styled('span')({
  padding: '2px 6px',
  fontSize: theme.fontSizes[0],
  fontWeight: theme.fontWeights.bold,
  background: theme.colors.secondary,
  textTransform: 'uppercase',
  borderRadius: theme.radii[5],
  color: 'white',
  position: 'relative',
  verticalAlign: 'middle',
  fontFamily: theme.fonts.sans
})

export default Badge
