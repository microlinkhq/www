require('./fetch-data')({
  name: 'demo-links',
  data: require('@microlink/demo-links'),
  concurrency: 5,
  mqlProps: {
    force: true,
    audio: true,
    video: true,
    palette: true,
    iframe: true
  }
})
