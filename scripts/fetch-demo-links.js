require('./fetch-data')({
  name: 'demo-links',
  data: require('@microlink/demo-links'),
  concurrency: 5,
  mqlProps: {
    browser: 'light',
    force: true,
    audio: true,
    video: true,
    palette: true,
    screenshot: true,
    iframe: true
  }
})
