import React from 'react'
import { Link, Text, Flex, Card } from 'components/elements'
import { Headline } from 'components/patterns'
import * as Icons from 'components/icons'
import chunk from 'lodash/chunk'

const CustomCard = ({ blockOne, blockTwo, ...props }) => (
  <Card flexDirection='column' justifyContent='center' ratio={RATIO} {...props}>
    <Flex pb={[2, 2, 3, 3]} justifyContent='center'>
      {blockOne}
    </Flex>
    <Flex
      pt={[2, 2, 3, 3]}
      width='100%'
      justifyContent='center'
      flexDirection='column'
      alignItems='center'
    >
      {blockTwo}
    </Flex>
  </Card>
)

const ICON_SIZE = ['60px', '60px', '80px', '80px']

const RATIO = [0.6, 0.6, 0.7, 0.7]

const children = [
  {
    blockOne: <Icons.React width={ICON_SIZE} />,
    blockTwo: (
      <>
        <Text>React</Text>
        <Text>
          <Link href='/docs/sdk/integrations/react/'>Documentation</Link>
        </Text>
        <Text>
          <Link
            icon
            href='https://codesandbox.io/s/gracious-blackburn-n5w839zm4m'
          >
            CodeSandbox
          </Link>{' '}
          /{' '}
          <Link icon href='https://sdk-react.microlink.io'>
            Storybook
          </Link>
        </Text>
      </>
    )
  },
  {
    blockOne: <Icons.Vue width={ICON_SIZE} />,
    blockTwo: (
      <>
        <Text>Vue</Text>
        <Text>
          <Link href='/docs/sdk/integrations/vue/'>Documentation</Link>
        </Text>
        <Text>
          <Link icon href='https://codesandbox.io/s/microlinkvue-255wg'>
            CodeSandbox
          </Link>{' '}
          /{' '}
          <Link icon href='https://sdk-vue.microlink.io'>
            Storybook
          </Link>
        </Text>
      </>
    )
  },
  {
    blockOne: <Icons.JavaScript width={ICON_SIZE} />,
    blockTwo: (
      <>
        <Text>Vanilla</Text>
        <Text>
          <Link href='/docs/sdk/integrations/vanilla/'>Documentation</Link>
        </Text>
        <Text>
          <Link icon href='https://codesandbox.io/s/nervous-cherry-o92r2y4q9z'>
            CodeSandbox
          </Link>{' '}
          /{' '}
          <Link icon href='https://vanilla.microlink.io'>
            Storybook
          </Link>
        </Text>
      </>
    )
  },
  {
    blockOne: <Icons.Jekyll width={ICON_SIZE} />,
    blockTwo: (
      <>
        <Text>Jekyll</Text>
        <Text>
          <Link href='/docs/sdk/integrations/jekyll/'>Documentation</Link>
        </Text>
      </>
    )
  },
  {
    blockOne: (
      <Text color='gray6' fontSize={ICON_SIZE} style={{ lineHeight: 1 }}>
        🎉
      </Text>
    ),
    blockTwo: (
      <Text>
        <Link href='https://github.com/microlinkhq/open/issues/new/choose'>
          Request an integration
        </Link>{' '}
      </Text>
    )
  }
]

const Explore = ({ itemsPerRow = 3, title, caption, ...props }) => {
  return (
    <Flex
      px={4}
      pt={4}
      pb={4}
      width='100%'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Flex
        pt={[0, 0, 4, 4]}
        pb={[0, 0, 4, 4]}
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Headline title={title} caption={caption} pb={[4, 4, 4, 4]} />

        {chunk(children, itemsPerRow).map((row, chunkIndex) => (
          <Flex
            key={`chunk_${chunkIndex}`}
            pt={chunkIndex === 0 ? 0 : [4, 4, 5, 5]}
          >
            {row.map((rowProps, rowIndex) => (
              <CustomCard
                key={`chunk_${chunkIndex}_row_${rowIndex}`}
                mx={4}
                {...rowProps}
              />
            ))}
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export default Explore
