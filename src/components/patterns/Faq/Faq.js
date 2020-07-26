import React from 'react'
import { Subhead, Text, Box, Container, Flex } from 'components/elements'
import { Caption } from 'components/patterns'
import { layout } from 'theme'

const Faq = ({ title, caption, questions, ...props }) => {
  return (
    <Container id='faq' {...props}>
      <Flex flexDirection='column' alignItems='center'>
        <Subhead variant='gradient' children={title} titleize={false} />
        <Caption pt={4} pb={5} maxWidth={layout.normal} titleize={false}>
          Frequently Asked Questions.
        </Caption>
      </Flex>

      <Flex
        as='section'
        justifyContent='center'
        flexDirection='column'
        alignItems='center'
        px={[0, 0, 4, 6]}
      >
        <Box pb={[0, 0, 4, 4]}>
          {questions.map(({ answer, question }, index) => {
            return (
              <Text
                pl={[0, 0, 4, 4]}
                pt={4}
                maxWidth={layout.normal}
                key={`question_${index}`}
              >
                <Subhead
                  pt={index === 0 ? 0 : 4}
                  textAlign='left'
                  pb={[2, 2, 3, 3]}
                  fontSize={[2, 2, 3, 3]}
                  children={question}
                />
                {answer.map((paraph, index) => (
                  <Text
                    pt={index === 0 ? 0 : 3}
                    key={`answer_${index}`}
                    color='black80'
                    children={paraph}
                  />
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
