import { researcherAvatarUrl, websiteLabel } from 'helpers/researcher'
import { Container } from 'helpers/hoc/with-container'
import { Link } from 'components/elements/Link'
import Image from 'components/elements/Image/Image'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { theme } from 'theme'
import React from 'react'

const Researcher = ({ name, email, website }) => (
  <Flex as='li' css={theme({ alignItems: 'center', gap: 2 })}>
    <Image
      src={researcherAvatarUrl(email)}
      alt={`Avatar of ${name}`}
      width='40px'
      height='40px'
      css={theme({
        borderRadius: 999,
        border: '1px solid',
        borderColor: 'black05'
      })}
    />
    <Flex css={theme({ flexDirection: 'column', alignItems: 'flex-start' })}>
      <Text css={theme({ fontWeight: 'bold', lineHeight: 1.2 })}>{name}</Text>
      <Flex css={theme({ gap: 2, fontSize: 1, flexWrap: 'wrap' })}>
        <Link href={`mailto:${email}`}>{email}</Link>
        {website && (
          <Link href={website} externalIcon>
            {websiteLabel(website)}
          </Link>
        )}
      </Flex>
    </Flex>
  </Flex>
)

export const Researchers = ({ researchers }) => (
  <Container>
    <Flex
      as='ul'
      css={theme({ flexDirection: 'column', gap: 3, p: 0, m: 0 })}
      style={{ listStyle: 'none' }}
    >
      {researchers.map(researcher => (
        <Researcher key={researcher.email} {...researcher} />
      ))}
    </Flex>
  </Container>
)
