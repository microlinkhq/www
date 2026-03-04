import { layout, theme } from 'theme'
import FlickeringBackground from 'components/patterns/FlickeringBackground/FlickeringBackground'
import Layout from 'components/patterns/Layout'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import React from 'react'
import { cdnUrl } from 'helpers/cdn-url'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import Card from 'components/elements/Card/Card'

import skills from '../../data/skills.json'

const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const REQUEST_SKILL_URL = 'https://github.com/microlinkhq/skills/issues/new'

export const Head = () => (
  <Meta
    title='Microlink Skills'
    description='Browse reusable skills and implementation guides for common automation workflows.'
    image={cdnUrl('banner/recipes.jpeg')}
  />
)

const SkillsPage = () => (
  <FlickeringBackground>
    <Layout footer={{ style: { background: 'transparent' } }}>
      <Flex css={theme({ flexDirection: 'column', alignItems: 'center' })}>
        <Flex
          css={theme({
            flexDirection: 'column',
            alignItems: 'center'
          })}
        >
          <Heading variant={null} css={theme({ maxWidth: layout.large })}>
            Microlink{' '}
            <Heading titleize={false} as='span'>
              SKILLS
            </Heading>
          </Heading>
          <Caption
            forwardedAs='h2'
            titleize={false}
            css={theme({ pt: 3, px: 4, maxWidth: layout.small })}
          >
            A set of skills built by agents.
          </Caption>
        </Flex>

        <Flex
          css={theme({
            pt: [3, null, 4],
            width: '100%',
            maxWidth: layout.large,
            flexWrap: 'wrap',
            justifyContent: 'space-between'
          })}
        >
          {skills.map(skill => (
            <Box
              key={skill.slug}
              css={theme({
                width: ['100%', '100%', '49%'],
                mb: 3
              })}
            >
              <Card width='100%' height='auto'>
                <Link
                  href={`/skills/${skill.slug}`}
                  css={theme({ color: 'black', _hover: { color: 'inherit' } })}
                >
                  <Box css={theme({ p: 4 })}>
                    <Text
                      as='h3'
                      css={theme({ fontWeight: 'bold', fontSize: 2, m: 0 })}
                    >
                      {skill.name}
                    </Text>
                    <Text
                      css={theme({
                        color: 'black60',
                        mt: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      })}
                    >
                      {skill.description}
                    </Text>
                  </Box>
                </Link>
              </Card>
            </Box>
          ))}
        </Flex>

        <Flex
          css={theme({
            pt: [5, null, 6],
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: ['column', null, 'row'],
            width: '100%',
            maxWidth: layout.large
          })}
        >
          <Subhead>Miss a skill?</Subhead>
          <Box css={theme({ pt: [4, null, 0] })}>
            <Button
              onClick={() =>
                window.open(REQUEST_SKILL_URL, '_blank', 'noopener noreferrer')}
            >
              <Caps>Request a Skill</Caps>
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Layout>
  </FlickeringBackground>
)

export default SkillsPage
