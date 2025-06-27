import definitions from './definitions.json'
import { hash } from './hash.js'

export const mqlCode = (url, opts) => {
  const key = hash(url, opts)
  const value = definitions[key]

  if (value === undefined) {
    const message = `No definition found for this URL and opts.
 url: ${url}
opts: ${JSON.stringify(opts)}

Please, run \`npm run generate-code\` to generate the definition for this URL and opts.`

    throw new Error(message)
  }

  return value
}
