import { title } from './title'
import { description } from './description'
import { image } from './image'
import { logo } from './logo'
import { url } from './url'
import { publisher } from './publisher'
import { author } from './author'
import { locale } from './locale'
import { date } from './date'
import { buildFixSnippet } from './fix-snippet'

export const VALIDATOR_STATUS_OK = 'OK'
export const VALIDATOR_STATUS_WARNING = 'WARNING'
export const VALIDATOR_STATUS_ERROR = 'ERROR'

export const VALIDATOR_STATUS = {
  [VALIDATOR_STATUS_OK]: {
    color: 'green7',
    bg: 'green0'
  },
  [VALIDATOR_STATUS_WARNING]: {
    color: 'orange7',
    bg: 'orange0'
  },
  [VALIDATOR_STATUS_ERROR]: {
    color: 'red8',
    bg: 'red0'
  }
}

export { buildFixSnippet }

const FIELD_VALIDATORS = {
  title,
  description,
  image,
  logo,
  url,
  publisher,
  author,
  locale,
  date
}

export const validate = metadata => {
  const fields = [
    {
      name: 'title',
      value: metadata.title
    },
    {
      name: 'description',
      value: metadata.description
    },
    {
      name: 'image',
      value: metadata.image?.url,
      width: metadata.image?.width,
      height: metadata.image?.height,
      size: metadata.image?.size_pretty,
      sizeBytes: metadata.image?.size
    },
    {
      name: 'logo',
      value: metadata.logo?.url,
      width: metadata.logo?.width,
      height: metadata.logo?.height,
      size: metadata.logo?.size_pretty,
      sizeBytes: metadata.logo?.size
    },
    {
      name: 'url',
      value: metadata.url,
      size: metadata.url?.size_pretty,
      sizeBytes: metadata.url?.size
    },
    {
      name: 'publisher',
      value: metadata.publisher
    },
    {
      name: 'locale',
      value: metadata.lang
    },
    {
      name: 'author',
      value: metadata.author
    },
    {
      name: 'date',
      value: metadata.date
    }
  ]
    .map(field => ({
      ...field,
      isNullable: field.value === null || field.value === undefined
    }))
    .sort((a, b) => {
      if (a.isNullable && !b.isNullable) return -1
      if (!a.isNullable && b.isNullable) return 1
      return 0
    })

  const statusPriority = {
    [VALIDATOR_STATUS_ERROR]: 0,
    [VALIDATOR_STATUS_WARNING]: 1,
    [VALIDATOR_STATUS_OK]: 2
  }

  return fields
    .map(field => {
      let result = null

      if (field.isNullable) {
        result = {
          status: VALIDATOR_STATUS_ERROR,
          resume: 'Missing'
        }
      } else {
        result = FIELD_VALIDATORS[field.name](field)
      }

      return {
        name: field.name,
        value: field.value,
        type: field.type,
        isNullable: field.isNullable,
        ...result
      }
    })
    .sort((a, b) => {
      const aPriority = statusPriority[a.status] ?? Number.POSITIVE_INFINITY
      const bPriority = statusPriority[b.status] ?? Number.POSITIVE_INFINITY
      if (aPriority !== bPriority) return aPriority - bPriority
      return a.name.localeCompare(b.name)
    })
}
