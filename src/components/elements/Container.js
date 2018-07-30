import { Container as ContainerBase } from 'rebass'
import system from 'system-components'
import { layout } from 'theme'

const Container = system({ is: ContainerBase })

Container.defaultProps = {
  maxWidth: layout.web
}

export default Container
