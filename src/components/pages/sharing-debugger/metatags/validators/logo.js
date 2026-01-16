import { resume } from './image'

export const logo = (field = {}) => {
  if (field.isNullable) {
    return {
      status: 'ERROR',
      resume: resume(field),
      description: 'Logo is missing, so it cannot be validated.'
    }
  }

  if (field.width > 100 && field.height > 100) {
    return {
      status: 'OK',
      resume: resume(field),
      description:
        'Logos larger than 100x100 pixels ensure better visibility and quality across different platforms and devices, especially on high-resolution displays.'
    }
  }
  return {
    status: 'WARNING',
    resume: resume(field),
    description:
      'Logos smaller than 100x100 pixels may appear blurry or low quality. Consider using a larger logo.'
  }
}
