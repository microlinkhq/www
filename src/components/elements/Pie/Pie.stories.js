import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import Pie from './Pie'

const storyName = 'Pie'

const data = [
  { size: '644 kB', label: 'image', value: 20 },
  { size: '644 kB', label: 'script', value: 6 },
  { size: '644 kB', label: 'stylesheet', value: 2 },
  { size: '644 kB', label: 'document', value: 1 },
  { size: '644 kB', label: 'font', value: 1 },
  { size: '644 kB', label: 'other', value: 1 },
  { size: '644 kB', label: 'media', value: 0 },
  { size: '644 kB', label: 'third party', value: 17 }
].map(item => ({ ...item, id: item.label }))

const code = `
import { Pie } from 'components/elements'

export default () => (
  <Pie
    data={${JSON.stringify(data, null, 2)}}
  />
)`

const PieStory = () => {
  return (
    <Story name={storyName} code={code}>
      <Pie data={data} />
    </Story>
  )
}

storiesOf('Elements', module).add(storyName, () => <PieStory />)
