const If = props =>
  props.condition ? (props.render ? props.render() : props.children) : null

export default If
