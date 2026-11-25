import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'

const CODE_PATHS = ['src', 'scripts', 'test', 'gatsby-*.js']
const OTHER_ICON_LIBRARIES = [
  'react-feather',
  'feather-icons',
  'react-icons',
  '@heroicons/react',
  '@tabler/icons-react',
  '@phosphor-icons/react',
  '@radix-ui/react-icons'
]
const GIT_GREP_NO_MATCHES = 1

const escape = value => value.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')
const specifier = new RegExp(
  `from[[:space:]]*['"](${OTHER_ICON_LIBRARIES.map(escape).join('|')})['"/]`
).source

const filesImportingOtherIcons = () => {
  const { status, stdout } = spawnSync(
    'git',
    ['grep', '--untracked', '-lE', specifier, '--', ...CODE_PATHS],
    { encoding: 'utf8' }
  )
  expect(status === 0 || status === GIT_GREP_NO_MATCHES).toBe(true)
  return stdout.split('\n').filter(Boolean)
}

describe('lucide-react is the only icon library', () => {
  test('package.json depends on lucide-react and no other icon library', () => {
    const { dependencies = {}, devDependencies = {} } = JSON.parse(
      readFileSync('package.json', 'utf8')
    )
    const all = { ...dependencies, ...devDependencies }
    expect(all).toHaveProperty('lucide-react')
    expect(OTHER_ICON_LIBRARIES.filter(name => name in all)).toEqual([])
  })

  test('site code never imports another icon library', () => {
    expect(filesImportingOtherIcons()).toEqual([])
  })
})
