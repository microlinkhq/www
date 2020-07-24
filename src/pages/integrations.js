import { DotsBackground, Layout, Headline } from 'components/patterns'
import { Link, Text, Flex, Card } from 'components/elements'
import * as Icons from 'components/icons'
import { layout } from 'theme'
import React from 'react'

const TITLE = 'Integrations'
const CAPTION = 'discover all the things you can do'

const ICON_SIZE = ['60px', '60px', '60px', '60px']

const CARD_SIZE = [0.5, 0.5, 0.6, 0.6]

const CustomCard = ({ blockOne, blockTwo, ...props }) => (
  <Card
    flexDirection='column'
    justifyContent='center'
    ratio={CARD_SIZE}
    {...props}
  >
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

const INTEGRATIONS = [
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

export default ({ meta, ...props }) => (
  <DotsBackground alignItems='center' justifyContent='center'>
    <Layout footer={{ bg: 'transparent' }} {...meta}>
      <Flex
        pt={[0, 0, 0, 3]}
        px={3}
        width='100%'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        {...props}
      >
        <Headline title={TITLE} caption={CAPTION} pb={4} />
        <Flex maxWidth={layout.large} justifyContent='center' flexWrap='wrap'>
          {INTEGRATIONS.map((integration, index) => (
            <CustomCard key={index} mb={4} mr={4} {...integration} />
          ))}
        </Flex>
      </Flex>
    </Layout>
  </DotsBackground>
)
