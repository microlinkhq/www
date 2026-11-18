import { describe, expect, test } from 'vitest'
import { elementsOf } from '../../utils/jsx-source'

describe('elementsOf', () => {
  test('reads a button body, including a nested button', () => {
    expect(elementsOf('<Button>Buy</Button>', 'Button')[0].body).toBe('Buy')
    const [outer] = elementsOf(
      '<Button><Button>In</Button>Out</Button>',
      'Button'
    )
    expect(outer.body).toBe('<Button>In</Button>Out')
  })

  test('a nested tag without a closing angle bracket does not loop', () => {
    expect(elementsOf('<Button><Button', 'Button')).toHaveLength(1)
  }, 1000)
})
