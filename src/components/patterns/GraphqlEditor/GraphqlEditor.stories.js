import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import GraphqlEditor from './GraphqlEditor'

import '!style-loader!css-loader!sass-loader!../../../styles/main.scss'

const code = `
import { GraphqlEditor } from 'components/patterns'

export default () => (
  <GraphqlEditor graphqlEndpoint={graphqlEndpoint} />
)
`

const graphqlEndpoint = `https://localhost:3000/graphql`

storiesOf('Patterns', module).add('GraphqlEditor', () => (
  <Story name='GraphqlEditor' code={code} style={{ width: '100%' }}>
    <GraphqlEditor graphqlEndpoint={graphqlEndpoint} />
  </Story>
))
