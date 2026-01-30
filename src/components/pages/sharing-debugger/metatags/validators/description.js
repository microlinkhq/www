export const description = (field = {}) => {
  const length = field.value?.length || 0
  if (length >= 90 && length <= 155) {
    return {
      status: 'OK',
      resume: `${length} chars`,
      description:
        'Descriptions between 90-155 characters are ideal for social media previews. They provide enough context without being truncated on most platforms.'
    }
  }
  return {
    status: 'WARNING',
    resume: `${length} chars`,
    description:
      'Descriptions outside the 90-155 character range may be truncated or too short. Consider adjusting the length.'
  }
}
