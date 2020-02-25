import { Terminal, Box, Text } from 'components/elements'
import { CheckCircle } from 'react-feather'
import { colors } from 'theme'
import get from 'dlv'

import React from 'react'

const ConsoleText = props => (
  <Text
    as='span'
    fontWeight='regular'
    fontFamily='mono'
    color='red8'
    fontSize={0}
    {...props}
  />
)

const getConsoleErrors = insights => {
  const errorsInConsole = get(insights, 'errors-in-console')
  if (!errorsInConsole) return

  const consoleErrors = get(insights, 'errors-in-console.details.items') || []

  if (consoleErrors.length === 0) {
    return (
      <>
        <CheckCircle size={12} color={colors.close} />
        <Text color='gray7' ml={2} display='inline'>
          No browser errors logged to the console.
        </Text>
      </>
    )
  }

  return consoleErrors.reduce((acc, { source, description, url }, index) => {
    const key = source + description + url
    const item = (
      <div key={key}>
        <ConsoleText fontWeight='bold' children={`[${source.toUpperCase()}]`} />
        <Box />
        <ConsoleText children={`  - ${description}`} />
        <Box />
        <ConsoleText children={`    ${url}`} />
        <Box mb={acc.length - 1 === index ? 0 : 3} />
      </div>
    )
    return [...acc, item]
  }, [])
}

export default ({ insights, ...props }) => {
  const consoleErrors = getConsoleErrors(insights)
  return (
    <Terminal
      // maxWidth='800px'
      blinkCursor={false}
      shellSymbol={false}
      children={consoleErrors}
      {...props}
    />
  )
}
