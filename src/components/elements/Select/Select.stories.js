import React, { useState, Fragment } from 'react'

import { storiesOf } from '@storybook/react'
import { Select, CodeEditor, Subhead, Text } from 'components/elements'

const options = ['Markup', 'CSS', 'C-like', 'JavaScript']

const MySelect = ({ ...props }) => {
  const [lang, setState] = useState(options[0])
  return (
    <Select
      onChange={event => {
        event.preventDefault()
        const language = event.target.value
        setState(language)
      }}
      {...props}
    >
      {options.map(language => {
        const isActive = lang === language
        return (
          <option
            selected={isActive}
            key={language}
            children={language}
            fontSize={0}
            fontWeight='regular'
            mr={2}
            mb={'12px'}
          />
        )
      })}
    </Select>
  )
}

storiesOf('Elements', module).add('Select', () => (
  <Fragment>
    <Subhead textAlign='left' mb={3}>{`<Select />`}</Subhead>
    <Text fontSize={0}>
      <MySelect mx='auto' width={'5rem'} mb={2} bg='white' />
    </Text>
    <CodeEditor my={4} language='jsx'>{`
import { Select } from 'components/elements'

export default () => (
  <Select aria-label="Select one programming language">
    <option selected>Markup</option>
    <option>CSS</option>
    <option>C-like</option>
    <option>JavaScript</option>
  </Select>
)
`}</CodeEditor>
  </Fragment>
))
