export const publisher = (field = {}) => ({
  status: 'OK',
  resume: `${field.value?.length || 0} chars`,
  description:
    'Publisher field helps establish brand identity and improves credibility in search results and social media previews.'
})
