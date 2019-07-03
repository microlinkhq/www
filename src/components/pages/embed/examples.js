import { Search as SearchIcon } from 'react-feather'
import {
  Subhead,
  Flex,
  Input,
  Link,
  Text,
  Box,
  ButtonSecondary,
  Container,
  Hide,
  Caps
} from 'components/elements'
import React, { Fragment } from 'react'
import { transition, colors } from 'theme'
import * as Logos from 'components/logos'
import styled from 'styled-components'

import { Microlink } from 'components/patterns'

const LogoWrap = styled(Box)`
  cursor: pointer;
  opacity: 0.5;
  transition: opacity ${transition.short};
  &:hover {
    opacity: 1;
  }
`

LogoWrap.defaultProps = {
  ...Box.defaultProps,
  display: 'inline-block'
}

const SearchBox = ({ onSubmit, url, innerRef, isLoading }) => (
  <Container py={5} px={4}>
    <Subhead>Turn websites into rich media</Subhead>

    <Flex
      py={4}
      pb={4}
      mb={2}
      as='form'
      justifyContent='center'
      onSubmit={onSubmit}
      autoComplete='on'
    >
      <Input
        defaultValue={url}
        fontSize={2}
        name='url'
        id='url'
        autoComplete='on'
        innerRef={innerRef}
        required
        type='url'
        placeholder='Type an URL...'
        width='12rem'
        iconComponent={<SearchIcon color={colors.black50} size={16} />}
      />

      <ButtonSecondary ml={2} loading={isLoading}>
        <Caps fontSize={1} children='Enter' />
      </ButtonSecondary>
    </Flex>

    <Flex
      flexDirection={['column', 'column', 'column', 'row']}
      alignItems='center'
      justifyContent='center'
    >
      <Link href='https://www.instagram.com/p/BvDTdWdnzkj/'>
        instagram.com/p/BvDTdWdnzkj
      </Link>
      <Hide breakpoints={[0, 1, 2]}>
        <Text fontSize={[2, 2, 2, 4]} mx={4} as='span'>
          →
        </Text>
      </Hide>
      <Hide breakpoints={[3]}>
        <Text fontSize={[2, 2, 2, 4]} py={2}>
          into
        </Text>
      </Hide>
      <Microlink
        media={['video']}
        style={{ margin: '0' }}
        url='https://www.instagram.com/p/BvDTdWdnzkj/'
      />
    </Flex>
  </Container>
)

const Examples = ({ demoLinks }) => (
  <Container
    py={4}
    px={4}
    maxWidth='100%'
    bg='pinky'
    borderColor='pinkest'
    borderTop='1px solid'
    borderBottom='1px solid'
  >
    <Subhead>Examples</Subhead>
    <Box as='ul' p={0} m={0} textAlign='center'>
      {demoLinks.map(({ brand }) => {
        const color = colors.black
        const LogoProvider = Logos[brand]

        return (
          <Box as='li' key={brand} color={color} display='inline-block'>
            <Link href={`/embed/${brand.toLowerCase()}`}>
              <LogoWrap p={3}>
                <LogoProvider ratio={0.6} color={color} />
              </LogoWrap>
            </Link>
          </Box>
        )
      })}
    </Box>
  </Container>
)

export default ({ demoLinks, onSubmit, url, innerRef, isLoading }) => (
  <Fragment>
    <SearchBox
      onSubmit={onSubmit}
      url={url}
      innerRef={innerRef}
      isLoading={isLoading}
    />
    <Examples demoLinks={demoLinks} />
  </Fragment>
)
