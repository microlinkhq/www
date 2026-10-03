import fs from 'node:fs'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { downloadImage } from '../../../scripts/static-assets'

const SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="450" height="300"><rect width="100%" height="100%" fill="#ddd"/></svg>'

const ROUTES = {
  '/450x300': { status: 200, type: 'image/svg+xml; charset=utf-8', body: SVG },
  '/moved': { status: 308, location: '/450x300' },
  '/latest': { status: 302, location: '/photo.png' },
  '/photo.png': {
    status: 200,
    type: 'application/octet-stream',
    body: 'png-bytes'
  },
  '/partial.png': { status: 206, type: 'image/png', body: 'png-bytes' },
  '/a/logo.png': { status: 200, type: 'image/png', body: 'first-logo' },
  '/b/logo.png': { status: 200, type: 'image/png', body: 'second-logo' },
  '/broken.png': { status: 200, type: 'text/html', body: '<h1>oops</h1>' },
  '/missing.png': { status: 404, type: 'text/plain', body: 'not found' }
}

let server
let origin
let imagesFolder

const hashedName = (basename, extension) =>
  new RegExp(`^${basename}-[0-9a-f]{8}\\${extension}$`)

beforeAll(async () => {
  server = http.createServer((req, res) => {
    const route = ROUTES[req.url]
    if (route.location) {
      res.writeHead(route.status, { location: route.location })
      return res.end()
    }
    res.writeHead(route.status, { 'content-type': route.type })
    res.end(route.body)
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  origin = `http://127.0.0.1:${server.address().port}`
})

afterAll(() => new Promise(resolve => server.close(resolve)))

beforeEach(() => {
  imagesFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'static-assets-'))
})

describe('downloadImage', () => {
  it('saves an extension-less SVG response as .svg', async () => {
    const { filename, outputPath } = await downloadImage(
      `${origin}/450x300`,
      imagesFolder
    )
    expect(filename).toMatch(hashedName('450x300', '.svg'))
    expect(fs.readFileSync(outputPath, 'utf8')).toBe(SVG)
  })

  it('follows redirects and names the file after the requested URL', async () => {
    const { filename } = await downloadImage(`${origin}/moved`, imagesFolder)
    expect(filename).toMatch(hashedName('moved', '.svg'))
  })

  it('falls back to the extension of the URL it was redirected to', async () => {
    const { filename } = await downloadImage(`${origin}/latest`, imagesFolder)
    expect(filename).toMatch(hashedName('latest', '.png'))
  })

  it('keeps both files when two URLs share a basename', async () => {
    const first = await downloadImage(`${origin}/a/logo.png`, imagesFolder)
    const second = await downloadImage(`${origin}/b/logo.png`, imagesFolder)
    expect(first.filename).not.toBe(second.filename)
    expect(fs.readFileSync(first.outputPath, 'utf8')).toBe('first-logo')
    expect(fs.readFileSync(second.outputPath, 'utf8')).toBe('second-logo')
  })

  it('writes nothing for a partial response', async () => {
    await expect(
      downloadImage(`${origin}/partial.png`, imagesFolder)
    ).rejects.toThrow('206')
    expect(fs.readdirSync(imagesFolder)).toEqual([])
  })

  it('writes nothing when the response is not an image', async () => {
    await expect(
      downloadImage(`${origin}/broken.png`, imagesFolder)
    ).rejects.toThrow('not a supported image')
    expect(fs.readdirSync(imagesFolder)).toEqual([])
  })

  it('writes nothing on an error status', async () => {
    await expect(
      downloadImage(`${origin}/missing.png`, imagesFolder)
    ).rejects.toThrow('404')
    expect(fs.readdirSync(imagesFolder)).toEqual([])
  })
})
