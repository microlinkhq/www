import React from 'react'

import JsonView from 'components/elements/JsonView/JsonView'

const HN_DATA = {
  publisher: 'ycombinator.com',
  lang: 'en',
  title: 'Hacker News',
  url: 'https://news.ycombinator.com/',
  date: '2026-05-28T14:48:04.000Z',
  image: {
    url: 'https://news.ycombinator.com/y18.svg',
    type: 'svg',
    size: 315,
    height: 18,
    width: 18,
    size_pretty: '315 B'
  },
  author: null,
  description: null,
  logo: {
    url: 'https://news.ycombinator.com/y18.svg',
    type: 'svg',
    size: 315,
    height: 18,
    width: 18,
    size_pretty: '315 B'
  }
}

const CLI_RESPONSE = {
  status: 'success',
  data: HN_DATA
}

const TerminalJsonView = () => <JsonView src={CLI_RESPONSE} />

export default TerminalJsonView
