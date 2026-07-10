import React, { useState } from 'react'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { theme, shadows } from 'theme'

const LABELS = ['ring', 'hairline', 'small', 'medium', 'large']

const ShadowsStory = () => {
  const [level, setLevel] = useState(3)
  return (
    <Flex
      css={theme({
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        fontFamily: 'sans'
      })}
    >
      <Flex css={theme({ gap: 2, flexWrap: 'wrap', justifyContent: 'center' })}>
        {shadows.map((_, index) => (
          <Box
            as='button'
            type='button'
            key={index}
            aria-pressed={level === index}
            onClick={() => setLevel(index)}
            css={theme({
              cursor: 'pointer',
              px: 3,
              py: 2,
              borderRadius: 4,
              border: 1,
              borderColor: level === index ? 'black' : 'gray3',
              bg: level === index ? 'black' : 'white',
              color: level === index ? 'white' : 'gray7',
              fontFamily: 'sans',
              fontSize: 0,
              fontWeight: 'bold'
            })}
          >
            {index} · {LABELS[index]}
          </Box>
        ))}
      </Flex>

      <Flex
        css={theme({
          width: '380px',
          height: '260px',
          bg: 'white',
          borderRadius: 5,
          boxShadow: shadows[level],
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2
        })}
      >
        <Box css={theme({ fontSize: 5, fontWeight: 'bold', color: 'black' })}>
          {level}
        </Box>
        <Box css={theme({ fontSize: 1, color: 'gray7' })}>{LABELS[level]}</Box>
      </Flex>

      <Box
        css={theme({
          fontFamily: 'mono',
          fontSize: 0,
          color: 'gray6',
          maxWidth: '560px',
          px: 4,
          textAlign: 'center'
        })}
      >
        {shadows[level]}
      </Box>
    </Flex>
  )
}

export default { title: 'Theme/Shadows' }

export const Default = () => <ShadowsStory />
