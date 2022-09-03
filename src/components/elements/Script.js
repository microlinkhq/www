import { useEffect } from 'react'

const Script = props => {
  useEffect(() => {
    const script = document.querySelector(`script[src="${props.src}"]`)
    if (!script) {
      const script = document.createElement('script')
      Object.keys(props).forEach(key => (script[key] = props[key]))
      document.body.appendChild(script)
      return () => document.body.removeChild(script)
    } else {
      if (props.onload) script.addEventListener('load', props.onload)
    }
  }, [props])

  return null
}

export default Script
