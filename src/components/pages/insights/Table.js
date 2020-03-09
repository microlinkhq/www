import React from 'react'
import { Flex, Text, Link } from 'components/elements'
import isUrl from 'is-url-http/lightweight'
import truncate from 'lodash/truncate'
import humanizeUrl from 'humanize-url'

const Origin = ({ children, ...props }) => {
  return isUrl(children) ? (
    <Link icon {...props} href={children}>
      {truncate(humanizeUrl(children), {
        length: 40,
        omission: '…'
      })}
    </Link>
  ) : (
    <Text color='gray7' {...props}>
      {children.toLowerCase()}
    </Text>
  )
}

const Header = ({ children, ...props }) => (
  <Flex
    flexDirection='row'
    borderBottom={1}
    borderColor='gray2'
    py={3}
    {...props}
  >
    {children.map((child, index) => (
      <Text
        key={child}
        as='span'
        fontWeight='bold'
        width={(index === 0 ? 3 : 1) / 4}
        children={child}
      />
    ))}
  </Flex>
)

export default ({ data, headers, fields, ...props }) => {
  return (
    <Flex
      pt={3}
      width='100%'
      justifyContent='space-around'
      flexDirection='column'
      {...props}
    >
      <Header children={headers} />
      {data.details.items.map(props => (
        <Flex
          key={JSON.stringify(props)}
          flexDirection='row'
          borderBottom={1}
          borderColor='gray2'
          py={3}
        >
          {fields.map((field, index) =>
            index === 0 ? (
              <Origin
                width={3 / 4}
                as='span'
                key={props[field]}
                children={props[field]}
              />
            ) : (
              <Text
                color='gray7'
                width={1 / 4}
                as='span'
                key={props[field]}
                children={props[field]}
              />
            )
          )}
        </Flex>
      ))}
    </Flex>
  )
}
