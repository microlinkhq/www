import styled from 'styled-components'
import Flex from './Flex'

const Form = styled(Flex)({
  whiteSpace: 'nowrap',
  borderRadius: '8px',
  boxShadow: '0 10px 24px 0 rgba(206, 212, 218, 0.3)',
  border: 'solid 8px white'
})

Form.defaultProps = {
  ...Flex.defaultProps,
  as: 'form',
  role: 'form'
}

Form.displayName = 'Form'

export default Form
