import React, { useState } from 'react'
import Head from 'components/Head'

export const useScript = ({ onload, ...props }) => {
  const [mountOnLoad, setMountOnLoad] = useState(false)

  const onChangeClientState = (newState, addedTags, removedTags) => {
    const el = addedTags.scriptTags && addedTags.scriptTags[0]
    if (el && !mountOnLoad) {
      setMountOnLoad(true)
      el.onload = onload
    }
  }

  return <Head onChangeClientState={onChangeClientState} script={[props]} />
}
