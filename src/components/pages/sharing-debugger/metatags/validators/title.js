export const title = (field = {}) => {
  const length = field.value?.length || 0
  if (length <= 60) {
    return {
      status: 'OK',
      resume: `${length} chars`,
      description:
        'Titles under 60 characters display fully in search results and social media previews, improving click-through rates and readability.'
    }
  }
  return {
    status: 'WARNING',
    resume: `${length} chars`,
    description:
      'Titles longer than 60 characters can be truncated in search results and social previews. Consider shortening the title.'
  }
}
