import { fontSizes, fonts, colors } from 'theme'

export default ({ children }) => {
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
