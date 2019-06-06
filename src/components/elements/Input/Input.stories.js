import { storiesOf } from '@storybook/react'
import React, { Fragment } from 'react'
import { Mail } from 'react-feather'

import { Input } from 'components/elements'
import { colors } from 'theme'
import { Story } from 'story'

const code = `
import { Select } from 'components/elements'

export default () => (
  <Input
    required
    type='email'
    placeholder='you@domain.com'
    width='9rem'
    fontSize={1}
  />
`

const codeWithIcon = `
<Input
  required
  type='email'
  placeholder='you@domain.com'
  width='9rem'
  fontSize={1}
  iconComponent={<Mail color={colors.black50} size={16} />}
/>
`

const storyName = 'Input'

storiesOf('Elements', module).add(storyName, () => (
  <Fragment>
    <Story name={storyName} code={code}>
      <Input
        required
        type='email'
        placeholder='you@domain.com'
        width='9rem'
        fontSize={1}
      />
    </Story>

    <Story name={storyName} code={codeWithIcon}>
      <Input
        required
        type='email'
        placeholder='you@domain.com'
        width='9rem'
        fontSize={1}
        iconComponent={<Mail color={colors.black50} size={16} />}
      />
    </Story>
  </Fragment>
))
