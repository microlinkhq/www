import React from 'react'
import { Text, Box, Container, Flex, Subhead } from 'components/elements'
import { Headline } from 'components/patterns'

const Faq = ({ title, caption, questions, ...props }) => {
  return (
    <Container id='faq' {...props}>
      <Headline pt={[0, 0, 4, 4]} title={title} caption={caption} />
      <Flex
        as='section'
        pt={[3, 4]}
        justifyContent='center'
        flexDirection='column'
        alignItems='center'
        px={[0, 0, 4, 6]}
      >
        <Box pb={[0, 0, 4, 4]}>
          {questions.map(({ answer, question }, index) => (
            <Text maxWidth='38em' key={answer}>
              <Subhead
                pt={index === 0 ? 0 : 4}
                textAlign='left'
                pb={[2, 3]}
                fontSize={[2, 3]}
                children={question}
              />
              {answer.map((paraph, index) => (
                <Text
                  pt={index === 0 ? 0 : 3}
                  key={question}
                  color='black80'
                  children={paraph}
                />
              ))}
            </Text>
          ))}
        </Box>
      </Flex>
    </Container>
  )
}

export default Faq
