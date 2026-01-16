export const url = (field = {}) => ({
  status: 'OK',
  resume: field.size || `${field.value?.length || 0} chars`,
  description:
    'URL field is present. Use a clean, canonical URL to improve sharing and SEO consistency.'
})
