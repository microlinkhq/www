import { fontSizes, fonts, colors } from 'theme'

const Nivo = ({ children }) => {
  return children({
    animate: true,
    colors: {
      scheme: 'orange_red'
    },
    theme: {
      tooltip: {
        container: {
          fontFamily: fonts.sans,
          color: colors.black80,
          fontSize: fontSizes[1]
        }
      }
    }
  })
}

Nivo.THEMES = [
  'nivo',
  'category10',
  'accent',
  'dark2',
  'paired',
  'pastel1',
  'pastel2',
  'set1',
  'set2',
  'set3',
  'brown_blueGreen',
  'purpleRed_green',
  'pink_yellowGreen',
  'purple_orange',
  'red_blue',
  'red_grey',
  'red_yellow_blue',
  'red_yellow_green',
  'spectral',
  'blues',
  'greens',
  'greys',
  'oranges',
  'purples',
  'reds',
  'blue_green',
  'blue_purple',
  'green_blue',
  'orange_red',
  'purple_blue_green',
  'purple_blue',
  'purple_red',
  'red_purple',
  'yellow_green_blue',
  'yellow_green',
  'yellow_orange_brown',
  'yellow_orange_red'
]

export default Nivo
