import React from 'react'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import { withSlug } from 'helpers/hoc/with-slug'
import { slug as slugger } from 'github-slugger'
import Caption from '../Caption/Caption'
import toParagraphs from './to-paragraphs'
import { layout, theme } from 'theme'
import styled from 'styled-components'

const Question = withSlug(({ index, ...props }) => (
  <Caption
    css={theme({
      fontWeight: 'bold',
      pt: 4,
      pr: [3, 0],
      textAlign: 'left',
      textWrap: 'pretty'
    })}
    {...props}
  />
))

const Faq = ({ title, caption, questions, css, ...props }) => {
  return (
    <Container
      as='section'
      id='faq'
      css={[theme({ width: '100%', minWidth: 0 }), css]}
      {...props}
    >
      {title && (
        <Flex css={theme({ flexDirection: 'column', alignItems: 'center' })}>
          <Subhead css={theme({ px: 4 })} variant='gradient'>
            {title}
          </Subhead>
          {caption && (
            <Caption
              css={theme({
                px: [4, 0, 0, 0],
                pt: [3, 4, 4, 4],
                pb: [4, 4, 4, 5],
                maxWidth: layout.normal
              })}
            >
              {caption}
            </Caption>
          )}
        </Flex>
      )}

      <Flex
        css={theme({
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'stretch',
          width: '100%',
          minWidth: 0
        })}
      >
        <Box
          css={theme({
            pb: [0, 0, 4, 4],
            width: '100%',
            minWidth: 0,
            maxWidth: layout.small,
            mx: 'auto'
          })}
        >
          {questions.map(({ answer, question }, index) => {
            return (
              <Text
                css={theme({
                  width: '100%',
                  minWidth: 0,
                  overflowWrap: 'break-word'
                })}
                key={question}
              >
                <Question index={index}>{question}</Question>
                {toParagraphs(answer).map(paraph => (
                  <Text
                    css={theme({
                      pt: [3, 4, 4, 4]
                    })}
                    key={paraph.key ?? slugger(question)}
                  >
                    {paraph}
                  </Text>
                ))}
              </Text>
            )
          })}
        </Box>
      </Flex>
    </Container>
  )
}

Faq.List = styled(Text).attrs({ as: 'ul' })(
  theme({
    py: 3,
    minWidth: 0,
    overflowWrap: 'break-word',
    '> li:not(:first-child)': {
      mt: 3
    }
  })
)

export default Faq
