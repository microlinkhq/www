import Logo from './logo'

export default () => (
  <nav className='dt w-100 border-box pa3 ph6-ns sans-serif'>
    <a className='dtc v-mid silver link dim w-25' href='#' title='Home'>
      <Logo height='20' />
    </a>
    <div className='dtc v-mid w-75 tr'>
      <a className='ttu link silver hover-white f7 dib mr3 mr4-ns' href='#' title='About'>Pricing</a>
      <a className='ttu link silver hover-white f7 dib mr3 mr4-ns' href='#' title='Store'>API</a>
      <a className='ttu link silver hover-white f7 dib' href='#' title='Contact'>About</a>
    </div>
  </nav>
)
