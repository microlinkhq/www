import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import Box from 'components/elements/Box'
import Markdown from 'components/markdown'
import chunk from 'lodash/chunk'
import React from 'react'
import { theme } from 'theme'

const Item = ({ title, description, ...props }) => (
  <Box
    as='li'
    css={theme({
      maxWidth: '16rem',
      listStyle: 'none',
      flex: 1,
      pt: 4,
      pr: [0, 3, 3, 3]
    })}
    {...props}
  >
    <Caps as='h4' css={theme({ pb: [1, 2], fontWeight: 'bold' })}>
      {title}
    </Caps>
    <Text
      css={`
        ${theme({ fontSize: 1 })}

        div {
          margin: 0;
          font-size: inherit;
        }
      `}
    >
      <Markdown>{description}</Markdown>
    </Text>
  </Box>
)

const Grid = ({
  children,
  itemsPerRow,
  childComponent: Component = Item,
  ...props
}) => (
  <>
    {chunk(children, itemsPerRow).map((row, index) => (
      <Flex
        as='ul'
        css={theme({
          justifyContent: [
            'space-around',
            'flex-start',
            'space-between',
            'space-between'
          ],
          pl: 0
        })}
        key={index}
        {...props}
      >
        {row.map(rowProps => (
          <Component key={JSON.stringify(rowProps)} {...rowProps} />
        ))}
      </Flex>
    ))}
  </>
)

export default Grid
