const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                tags
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMdx.edges

  const blogPosts = posts.filter(function(post) {
    const tags = post.node.frontmatter.tags || []
    return !tags.includes("microblog") && !tags.includes("inbox")
  })

  const microBlogs = posts.filter(function(post) {
    const tags = post.node.frontmatter.tags || []
    return tags.includes("microblog")
  })

  blogPosts.forEach((post, index) => {
    const previous =
      index === blogPosts.length - 1 ? null : blogPosts[index + 1].node
    const next = index === 0 ? null : blogPosts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({
      node,
      getNode,
    })

    const pathArray = value.split("-")
    const year = pathArray[0]
    const month = pathArray[1]
    const day = pathArray[2]
    const remove = pathArray.splice(0, 3)
    const title = pathArray.join("-")

    createNodeField({
      name: `year`,
      node,
      value,
    })

    createNodeField({
      name: `month`,
      node,
      value,
    })

    createNodeField({
      name: `day`,
      node,
      value,
    })

    if (
      node.frontmatter.tags.includes("microblog") ||
      node.frontmatter.tags.includes("inbox")
    ) {
      createNodeField({
        name: `slug`,
        node,
        value: `${year}-${month}-${day}-${title}`,
      })
    } else {
      createNodeField({
        name: `slug`,
        node,
        value: `${year}/${month}/${day}/${title}`,
      })
    }
  }
}
