import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'

const CODE_PATHS = [
  'src/components',
  'src/helpers',
  'src/pages',
  'scripts',
  'gatsby-*.js'
]

const MQL_MODULE_SPECIFIER = '[\'"`]@microlink/mql[/\'"`]'
const GIT_GREP_NO_MATCHES = 1

const filesImportingMql = () => {
  const { status, stdout } = spawnSync(
    'git',
    ['grep', '--untracked', '-lE', MQL_MODULE_SPECIFIER, '--', ...CODE_PATHS],
    { encoding: 'utf8' }
  )
  expect(status === 0 || status === GIT_GREP_NO_MATCHES).toBe(true)
  return stdout.split('\n').filter(Boolean)
}

describe('microlink.io is the only API client', () => {
  test('package.json does not depend on @microlink/mql directly', () => {
    const { dependencies, devDependencies } = JSON.parse(
      readFileSync('package.json', 'utf8')
    )
    expect(dependencies).not.toHaveProperty('@microlink/mql')
    expect(devDependencies).not.toHaveProperty('@microlink/mql')
  })

  test('site code never imports @microlink/mql', () => {
    expect(filesImportingMql()).toEqual([])
  })
})
