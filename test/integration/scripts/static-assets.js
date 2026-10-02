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
  '/broken.png': { status: 200, type: 'text/html', body: '<h1>oops</h1>' },
  '/missing.png': { status: 404, type: 'text/plain', body: 'not found' }
}

let server
let origin
let imagesFolder

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
      imagesFolder,
      1
    )
    expect(filename).toBe('450x300.svg')
    expect(fs.readFileSync(outputPath, 'utf8')).toBe(SVG)
  })

  it('follows redirects and names the file after the requested URL', async () => {
    const { filename } = await downloadImage(`${origin}/moved`, imagesFolder, 1)
    expect(filename).toBe('moved.svg')
  })

  it('writes nothing when the response is not an image', async () => {
    await expect(
      downloadImage(`${origin}/broken.png`, imagesFolder, 1)
    ).rejects.toThrow('not a supported image')
    expect(fs.readdirSync(imagesFolder)).toEqual([])
  })

  it('writes nothing on an error status', async () => {
    await expect(
      downloadImage(`${origin}/missing.png`, imagesFolder, 1)
    ).rejects.toThrow('404')
    expect(fs.readdirSync(imagesFolder)).toEqual([])
  })
})
