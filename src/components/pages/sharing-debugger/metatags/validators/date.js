export const date = (field = {}) => {
  const dateValue = new Date(field.value)
  const isValidDate = !Number.isNaN(dateValue.getTime())
  return {
    status: isValidDate ? 'OK' : 'WARNING',
    resume: field.value || 'Unknown',
    description: isValidDate
      ? 'Date field helps search engines understand content freshness and improves SEO. Use ISO 8601 format for best compatibility.'
      : 'Date should be in a valid format (ISO 8601 recommended). Invalid dates can cause issues with search engines and social platforms.'
  }
}
