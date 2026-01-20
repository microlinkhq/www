export const resume = (field = {}) => {
  const resumeParts = []
  if (field.width && field.height) {
    resumeParts.push(`${field.width}x${field.height}`)
  }
  if (field.size_pretty || field.size) {
    resumeParts.push(field.size_pretty || field.size)
  }
  return resumeParts.length ? resumeParts.join(' • ') : 'Missing'
}

export const image = (field = {}) => {
  const resumeParts = []
  if (field.width && field.height) {
    resumeParts.push(`${field.width}x${field.height}`)
  }
  if (field.size_pretty || field.size) {
    resumeParts.push(field.size_pretty || field.size)
  }
  const resume = resumeParts.length ? resumeParts.join(' • ') : 'Missing'

  if (!field.sizeBytes) {
    return {
      status: 'WARNING',
      resume,
      description:
        'Image size is unknown, so it cannot be validated. Provide size metadata to confirm it meets the recommendation.'
    }
  }
  const sizeInKB = field.sizeBytes / 1024
  if (sizeInKB < 200) {
    return {
      status: 'OK',
      resume,
      description:
        'Images under 200 kB load faster, improving user experience and SEO. Social platforms also prefer smaller images for better performance.'
    }
  }
  return {
    status: 'WARNING',
    resume,
    description:
      'Images larger than 200 kB can slow down previews and page load. Consider compressing the image.'
  }
}
