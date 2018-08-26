import test from 'ava'

import getMediaAssetPath from '../src/helpers/get-media-asset-path'

const payload = {
  status: 'success',
  data: {
    lang: 'en',
    author: 'Futurism',
    title: 'Futurism - These tires can even climb stairs',
    publisher: 'TwitterCard',
    image: {
      url:
        'https://pbs.twimg.com/amplify_video_thumb/882986340605939712/img/k-NlEfo7z0Xvo9ab.jpg',
      width: 720,
      height: 720,
      type: 'jpg',
      size: 65648,
      size_pretty: '65.6 kB',
      palette: [
        '#4cacfc',
        '#bfc3c6',
        '#6d92b9',
        '#3d3d48',
        '#040c15',
        '#3cb4fc'
      ],
      background_color: '#040C15',
      color: '#3CB4FC',
      alternative_color: '#4CACFC'
    },
    description: '“These tires can even climb stairs https://t.co/ymr4KK15oI”',
    video: {
      url:
        'https://video.twimg.com/amplify_video/882986340605939712/vid/480x480/XcNdeyAihVz48yfL.mp4',
      width: 480,
      height: 480,
      type: 'h264',
      size: 8083656,
      size_pretty: '8.08 MB',
      duration: 83.25,
      duration_pretty: '1m'
    },
    date: '2018-08-26T08:39:00.000Z',
    logo: {
      url: 'https://abs.twimg.com/icons/apple-touch-icon-192x192.png',
      width: 192,
      height: 192,
      type: 'png',
      size: 2113,
      size_pretty: '2.11 kB',
      palette: ['#1ca4f4', '#06517e'],
      background_color: '#06517E',
      color: '#86CEF9',
      alternative_color: '#86CEF9'
    },
    url: 'https://twitter.com/futurism/status/882987478541533189'
  }
}

test('getMediaAssetPath', async t => {
  t.is(
    getMediaAssetPath('image', payload.data).filepath,
    '/card/twittercard/image.jpg'
  )
  t.is(
    getMediaAssetPath('video', payload.data).filepath,
    '/card/twittercard/video.h264'
  )
  t.is(
    getMediaAssetPath('logo', payload.data).filepath,
    '/card/twittercard/logo.png'
  )
})
