import React from 'react'

export default () => (
  <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
    <iframe
      frameBorder='0'
      target='_parent'
      src='https://chat.microlink.io/iframe/dialog'
      style={{
        width: '250px',
        height: '250px'
      }}
    />
  </div>
)
