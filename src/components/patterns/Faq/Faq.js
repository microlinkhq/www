import React from 'react'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import { withTitle } from 'helpers/hoc/with-title'
import { withSlug } from 'helpers/hoc/with-slug'
import { slug as slugger } from 'github-slugger'
import Caption from '../Caption/Caption'
import { layout, theme } from 'theme'

const Subhead = withTitle(SubheadBase)

const Question = withSlug(({ index, ...props }) => (
  <Caption
    css={theme({
      fontWeight: 'bold',
      pt: index === 0 ? 0 : 5,
      pr: [3, 0, 0, 0],
      textAlign: 'left'
    })}
    {...props}
  />
))

const Faq = ({ title, caption, questions, ...props }) => {
  return (
    <Container id='faq' {...props}>
      <Flex css={theme({ flexDirection: 'column', alignItems: 'center' })}>
        <Subhead css={theme({ px: 4 })} variant='gradient' titleize={false}>
          {title}
        </Subhead>
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
      </Flex>

      <Flex
        css={theme({
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          px: [0, 0, 4, 6]
        })}
      >
        <Box css={theme({ pb: [0, 0, 4, 4] })}>
          {questions.map(({ answer, question }, index) => {
            return (
              <Text
                css={theme({ px: 4, maxWidth: layout.small })}
                key={question}
              >
                <Question index={index}>{question}</Question>
                {React.Children.map(answer.props.children, (paraph, index) => (
                  <Text
                    css={theme({
                      pr: [3, 0, 0, 0],
                      pt: [3, 4, 4, 4],
                      color: 'black80'
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

export default Faq
