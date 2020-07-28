import React from 'react'
import { Subhead, Text, Box, Container, Flex } from 'components/elements'
import { Caption } from 'components/patterns'
import { layout } from 'theme'

const Faq = ({ title, caption, questions, ...props }) => {
  return (
    <Container id='faq' {...props}>
      <Flex flexDirection='column' alignItems='center'>
        <Subhead variant='gradient' children={title} titleize={false} />
        <Caption
          pt={[3, 4, 4, 4]}
          pb={[4, 4, 4, 5]}
          maxWidth={layout.normal}
          titleize={false}
          children={caption}
        />
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
                pt={[3, 4, 4, 4]}
                maxWidth={layout.normal}
                key={`question_${index}`}
              >
                <Caption
                  fontWeight='bold'
                  pt={index === 0 ? 0 : 5}
                  pr={[3, 0, 0, 0]}
                  textAlign='left'
                  children={question}
                />
                {answer.map((paraph, index) => (
                  <Text
                    pr={[3, 0, 0, 0]}
                    pt={[3, 4, 4, 4]}
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
