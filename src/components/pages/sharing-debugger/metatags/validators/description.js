export const description = (field = {}) => {
  const length = field.value?.length || 0
  if (length >= 140 && length <= 240) {
    return {
      status: 'OK',
      resume: `${length} chars`,
      description:
        'Descriptions between 140-240 characters are ideal for social media previews. They provide enough context without being truncated on most platforms.'
    }
  }
  return {
    status: 'WARNING',
    resume: `${length} chars`,
    description:
      'Descriptions outside the 140-240 character range may be truncated or too short. Consider adjusting the length.'
  }
}
