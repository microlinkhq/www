export const serializeBlogFeed = ({ siteUrl, nodes }) =>
  nodes.map(node => {
    const slug = node.fields.slug.replace(/\/+$/, '')
    const url = new URL(slug, siteUrl).toString()
    return {
      title: node.frontmatter.title,
      description: node.frontmatter.description || node.excerpt,
      date: node.frontmatter.date,
      url,
      guid: url
    }
  })
