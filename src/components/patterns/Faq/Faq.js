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
import { layout, space, theme } from 'theme'
import styled from 'styled-components'

const Question = withSlug(({ index, ...props }) => (
  <Caption
    css={theme({
      fontWeight: 'bold',
      pt: 4,
      pr: [3, 0],
      textAlign: 'left'
    })}
    {...props}
  />
))

const Faq = ({ title, caption, questions, ...props }) => {
  return (
    <Container as='section' id='faq' {...props}>
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
          alignItems: 'center'
        })}
      >
        <Box css={theme({ pb: [0, 0, 4, 4] })}>
          {questions.map(({ answer, question }, index) => {
            return (
              <Text css={theme({ maxWidth: layout.small })} key={question}>
                <Question index={index}>{question}</Question>
                {toParagraphs(answer).map((paraph, index) => (
                  <Text
                    css={theme({
                      pt: [3, 4, 4, 4]
                    })}
                    key={`${slugger(question)}-${index}`}
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

Faq.List = styled(Text).attrs({ as: 'ul' })`
  > li:not(:first-child) {
    margin-top: ${space[3]};
  }
`

export default Faq
