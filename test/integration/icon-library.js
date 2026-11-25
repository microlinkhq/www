import { spawnSync } from 'node:child_process'
import { readFileSync, unlinkSync, writeFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'

const codeRoots = manifest => {
  const roots = ['src', 'scripts', 'test', 'gatsby-*.js']
  if (manifest.scripts && manifest.scripts.storybook) roots.push('.storybook')
  return roots
}

const manifest = JSON.parse(readFileSync('package.json', 'utf8'))
const CODE_PATHS = codeRoots(manifest)
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
const quote = "'"

const escape = value => value.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')
const specifier = new RegExp(
  `(from[[:space:]]*|import[[:space:]]*|require\\([[:space:]]*|import\\([[:space:]]*)['"](${OTHER_ICON_LIBRARIES.map(
    escape
  ).join('|')})['"/]`
).source

const declaredDependencies = source => ({
  ...source.dependencies,
  ...source.devDependencies,
  ...source.peerDependencies,
  ...source.optionalDependencies
})

const importShapes = name => [
  `from ${quote}${name}${quote}`,
  `from "${name}"`,
  `import ${quote}${name}${quote}`,
  `require(${quote}${name}${quote})`,
  `import(${quote}${name}${quote})`,
  `from ${quote}${name}/dist${quote}`
]

const filesImportingOtherIcons = () => {
  const { status, stdout } = spawnSync(
    'git',
    [
      '-c',
      'color.ui=never',
      'grep',
      '--untracked',
      '-lE',
      specifier,
      '--',
      ...CODE_PATHS
    ],
    { encoding: 'utf8' }
  )
  expect(status === 0 || status === GIT_GREP_NO_MATCHES).toBe(true)
  return stdout.split('\n').filter(Boolean)
}

const PROBE = 'test/integration/.icon-library-probe.js'

const rejectsImport = shape => {
  writeFileSync(PROBE, `${shape}\n`)
  try {
    expect(filesImportingOtherIcons()).toContain(PROBE)
  } finally {
    unlinkSync(PROBE)
  }
}

describe('lucide-react is the only icon library', () => {
  test('package.json depends on lucide-react and no other icon library', () => {
    const all = declaredDependencies(manifest)
    expect(all).toHaveProperty('lucide-react')
    expect(OTHER_ICON_LIBRARIES.filter(name => name in all)).toEqual([])
  })

  test('every dependency field counts as an icon library', () => {
    const banned = OTHER_ICON_LIBRARIES.filter(
      name =>
        name in
        declaredDependencies({
          dependencies: { 'feather-icons': '1' },
          devDependencies: { '@heroicons/react': '1' },
          peerDependencies: { 'react-feather': '1' },
          optionalDependencies: { 'react-icons': '1' }
        })
    )
    expect(banned).toEqual([
      'react-feather',
      'feather-icons',
      'react-icons',
      '@heroicons/react'
    ])
  })

  test('every import form of another icon library is rejected', () => {
    for (const shape of importShapes('react-feather')) rejectsImport(shape)
  })

  test('site code never imports another icon library', () => {
    expect(filesImportingOtherIcons()).toEqual([])
  })

  test('scans storybook when the repo runs it', () => {
    expect(manifest.scripts).toHaveProperty('storybook')
    expect(CODE_PATHS).toContain('.storybook')
  })
})
