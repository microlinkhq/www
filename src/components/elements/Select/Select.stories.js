import { Select, Text } from 'components/elements'
import { storiesOf } from '@storybook/react'
import React, { useState } from 'react'
import { Story } from 'story'
import { theme } from 'theme'

const options = ['Markup', 'CSS', 'C-like', 'JavaScript']

const MySelect = ({ ...props }) => {
  const [lang, setState] = useState(options[0])
  return (
    <Select
      onChange={event => {
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
            css={theme({
              fontSize: 0,
              fontWeight: 'regular',
              mr: 2,
              mb: '12px'
            })}
          >
            {language}
          </option>
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
        const language = event.target.value
        setState(language)
      }}
      value={placeholder}
      css={theme({
        color: lang === placeholder ? 'black60' : 'inherit'
      })}
      {...props}
    >
      {[
        <option key={placeholder} disabled hidden>
          {placeholder}
        </option>
      ].concat(
        options.map(language => {
          return (
            <option
              key={language}
              css={theme({
                fontSize: 0,
                fontWeight: 'regular',
                mr: 2,
                mb: '12px'
              })}
            >
              {language}
            </option>
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
    <Text
      css={theme({
        fontSize: 0
      })}
    >
      <MySelect
        css={theme({
          ml: 'auto',
          mr: 'auto',
          width: '5rem',
          mb: 2,
          bg: 'white'
        })}
      />
      <MySelectWithDefault
        placeholder='Language'
        css={theme({
          ml: 3,
          mr: 'auto',
          width: '6rem',
          mb: 2,
          bg: 'white'
        })}
      />
    </Text>
  </Story>
))
