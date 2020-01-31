import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Select, Text } from 'components/elements'
import { Story } from 'story'

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
      selected={lang}
      {...props}
    >
      {options.map(language => {
        return (
          <option
            key={language}
            children={language}
            fontSize={0}
            fontWeight='regular'
            mr={2}
            mb='12px'
          />
        )
      })}
    </Select>
  )
}

const MySelectWithDefault = ({ placeholder, ...props }) => {
  const [lang, setState] = useState(placeholder)
  return (
    <Select
      onChange={event => {
        event.preventDefault()
        const language = event.target.value
        setState(language)
      }}
      selected={lang}
      color={lang === placeholder ? 'black50' : 'inherit'}
      {...props}
    >
      {[
        <option
          children={placeholder}
          key={placeholder}
          disabled
          selected
          hidden
        />
      ].concat(
        options.map(language => {
          return (
            <option
              key={language}
              children={language}
              fontSize={0}
              fontWeight='regular'
              mr={2}
              mb='12px'
            />
          )
        })
      )}
    </Select>
  )
}

const code = `
import { Select } from 'components/elements'

export default () => (
  <Select aria-label="Select one programming language">
    <option selected>Markup</option>
    <option>CSS</option>
    <option>C-like</option>
    <option>JavaScript</option>
  </Select>

  <Select ml={3} aria-label="Select one programming language">
    <optiondisabled selected hidden>Language</option>
    <option>CSS</option>
    <option>C-like</option>
    <option>JavaScript</option>
  </Select>
)`

storiesOf('Elements', module).add('Select', () => (
  <Story name='Select' code={code}>
    <Text fontSize={0}>
      <MySelect ml='auto' mr='auto' width='5rem' mb={2} bg='white' />
      <MySelectWithDefault
        placeholder='Language'
        ml={3}
        mr='auto'
        width='5.5rem'
        mb={2}
        bg='white'
      />
    </Text>
  </Story>
))
