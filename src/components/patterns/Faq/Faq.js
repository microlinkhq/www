import React from 'react'
import { Subhead, Text, Box, Container, Flex } from 'components/elements'
import { slug as slugger } from 'github-slugger'
import { Caption } from 'components/patterns'
import { withSlug } from 'helpers/hoc'
import { layout, theme } from 'theme'

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
          titleize={false}
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
