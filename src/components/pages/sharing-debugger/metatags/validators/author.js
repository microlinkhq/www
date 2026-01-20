export const author = (field = {}) => ({
  status: 'OK',
  resume: `${field.value?.length || 0} chars`,
  description:
    'Author field helps establish content attribution and improves credibility, especially for articles and blog posts.'
})
