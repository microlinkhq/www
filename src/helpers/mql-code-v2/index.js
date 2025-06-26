import definitions from './definitions.json'
import { hash } from './hash.js'

export const mqlCode = (url, options = {}) => {
  const key = hash(url, options)
  const value = definitions[key]

  if (value === undefined) {
    const message = `No definition found for this URL and options.
        url: ${url}
    options: ${JSON.stringify(options)}

    Please, run \`npm run generate-code\` to generate the definition for this URL and options.`

    throw new Error(message)
  }

  return value
}
