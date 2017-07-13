import Head from 'next/head'
import Highlight from 'react-syntax-highlight'

export default () => {
  const fixture = {
    'status': 'success',
    'data': {
      'url': 'https://www.youtube.com/watch?v=GDRd-BFTYIg',
      'author': 'Andrew Jrt',
      'date': '2017-07-07T00:00:00.000Z',
      'description': '👍 Subscribe - http://bit.do/AndrewJRT 🐦 Twitter - https://twitter.com/andrew_jrt 🎮 Twitch - https://twitch.tv/andrewjrt ❤ Patreon - https://www.patreon.com/a...',
      'image': 'https://i.ytimg.com/vi/GDRd-BFTYIg/maxresdefault.jpg',
      'publisher': 'YouTube',
      'title': 'Overwatch - Huge Massive Fist Punch Man'
    }
  }

  return (
    <div>
      <Head>
        <link rel='stylesheet' href='/static/css/highlight.css' />
      </Head>

      <div className='flex justify-center items-center pv4'>
        <div
          className='bg-black br2 mh3 ba b--dark-gray'
          style={{
            height: '322px',
            width: '480px'
          }}>
          <Highlight
            lang='json'
            className='code tl f7 ph3'
            style={{lineHeight: '24px'}}
            value={JSON.stringify(fixture, null, 2)}
          />
        </div>
      </div>
    </div>
  )
}
