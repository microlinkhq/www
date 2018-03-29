import React from 'react'
import { Main, Section } from 'components/elements'
import { Helmet } from 'react-helmet'
import { NavBar } from 'components/patterns'

const Post = ({ post }) => (
  <div>
    <a href={post.frontmatter.path}>
      {post.frontmatter.title} ({post.frontmatter.date})
    </a>
  </div>
)

const BlogIndex = ({ data: { allMarkdownRemark: { edges } } }) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <Post key={edge.node.id} post={edge.node} />)

  return (
    <Main>
      <NavBar />
      <Helmet title='Blog' />
      <Section pt={'56px'}>{Posts}</Section>
    </Main>
  )
}

export const pageQuery = graphql`
  query IndexBlog {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`

export default BlogIndex
