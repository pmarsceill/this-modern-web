module.exports = {
  siteMetadata: {
    title: `This Modern Web`,
    author: `Patrick Marsceill`,
    description: `The personal website of Patrick Marsceill`,
    siteUrl: `https://thismodernweb.com`,
    social: {
      twitter: `pmarsceill`,
      github: `pmarsceill`,
      keybase: `pmarsceill`,
      dribbble: `pmarsceill`,
    },
    menuLinks: [
      {
        name: "Feed",
        link: "/",
      },
      {
        name: "About",
        link: "/about",
      },
      {
        name: "Inbox",
        link: "/inbox",
      },
    ],
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        plugins: [`gatsby-remark-unwrap-images`, `gatsby-remark-images`],
        gatsbyRemarkPlugins: [
          `gatsby-remark-unwrap-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              showCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /assets\/.*\.svg/,
          options: {
            props: {
              height: "16px",
              width: "16px",
            },
          },
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/microblog`,
        name: `microblog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/inbox`,
        name: `inbox`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: `gatsby-plugin-feed-generator`,
      options: {
        generator: `GatsbyJS`,
        rss: true,
        json: true,
        siteQuery: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
                author
              }
            }
          }
        `,
        feeds: [
          {
            normalize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  title:
                    edge.node.frontmatter.title == edge.node.frontmatter.date
                      ? undefined
                      : edge.node.frontmatter.artist
                      ? undefined
                      : edge.node.frontmatter.title,
                  description: edge.node.frontmatter.description
                    ? edge.node.frontmatter.description
                    : undefined,
                  date: edge.node.frontmatter.date,
                  url: edge.node.frontmatter.artist
                    ? site.siteMetadata.siteUrl +
                      `/inbox` +
                      `#` +
                      edge.node.fields.slug.replace(/\//g, "")
                    : edge.node.frontmatter.tags &&
                      edge.node.frontmatter.tags.includes("microblog")
                    ? site.siteMetadata.siteUrl +
                      `/archive` +
                      `#` +
                      edge.node.fields.slug.replace(/\//g, "")
                    : site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: edge.node.frontmatter.artist
                    ? site.siteMetadata.siteUrl +
                      `/inbox` +
                      `#` +
                      edge.node.fields.slug.replace(/\//g, "")
                    : edge.node.frontmatter.tags &&
                      edge.node.frontmatter.tags.includes("microblog")
                    ? site.siteMetadata.siteUrl +
                      `/archive` +
                      `#` +
                      edge.node.fields.slug.replace(/\//g, "")
                    : site.siteMetadata.siteUrl + edge.node.fields.slug,
                  html:
                    edge.node.frontmatter.tags &&
                    edge.node.frontmatter.tags.includes("microblog")
                      ? edge.node.html.replace(/<style.*?<\/style>/g, "")
                      : edge.node.description
                      ? `<h2>${edge.node.frontmatter.description}</h2>` +
                        edge.node.html.replace(/<style.*?<\/style>/g, "")
                      : edge.node.frontmatter.artist
                      ? `<p>${edge.node.frontmatter.title} by ${
                          edge.node.frontmatter.artist
                        } - ${edge.node.frontmatter.status} on ${
                          edge.node.frontmatter.date
                        }
                            <a href="${site.siteMetadata.siteUrl +
                              `/inbox` +
                              `#` +
                              edge.node.fields.slug.replace(
                                /\//g,
                                ""
                              )}">thismodernweb.com</a></p>`
                      : edge.node.html.replace(/<style.*?<\/style>/g, ""),
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        description
                        date
                        tags
                      }
                    }
                  }
                }
              }
            `,
            name: "rss",
          },
          {
            normalize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  title:
                    edge.node.frontmatter.title == edge.node.frontmatter.date
                      ? undefined
                      : edge.node.frontmatter.artist
                      ? undefined
                      : edge.node.frontmatter.title,
                  date: edge.node.frontmatter.date,
                  url: edge.node.frontmatter.artist
                    ? site.siteMetadata.siteUrl +
                      `/inbox` +
                      `#` +
                      edge.node.fields.slug.replace(/\//g, "")
                    : edge.node.frontmatter.tags &&
                      edge.node.frontmatter.tags.includes("microblog")
                    ? site.siteMetadata.siteUrl +
                      `/archive` +
                      `#` +
                      edge.node.fields.slug.replace(/\//g, "")
                    : site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: edge.node.frontmatter.artist
                    ? site.siteMetadata.siteUrl +
                      `/inbox` +
                      `#` +
                      edge.node.fields.slug.replace(/\//g, "")
                    : edge.node.frontmatter.tags &&
                      edge.node.frontmatter.tags.includes("microblog")
                    ? site.siteMetadata.siteUrl +
                      `/archive` +
                      `#` +
                      edge.node.fields.slug.replace(/\//g, "")
                    : site.siteMetadata.siteUrl + edge.node.fields.slug,
                  html:
                    edge.node.frontmatter.tags &&
                    edge.node.frontmatter.tags.includes("microblog")
                      ? edge.node.html.replace(/<style.*?<\/style>/g, "")
                      : edge.node.description
                      ? `<p>${edge.node.frontmatter.description} "-" ${
                          edge.node.excerpt
                        } <a href="${site.siteMetadata.siteUrl +
                          edge.node.fields.slug}">thismodernweb.com</a></p>`
                      : edge.node.frontmatter.artist
                      ? `<p>${edge.node.frontmatter.title} by ${
                          edge.node.frontmatter.artist
                        } - ${edge.node.frontmatter.status} on ${
                          edge.node.frontmatter.date
                        } <a href="${site.siteMetadata.siteUrl +
                          `/inbox` +
                          `#` +
                          edge.node.fields.slug.replace(
                            /\//g,
                            ""
                          )}">thismodernweb.com</a></p>`
                      : `<p>${edge.node.excerpt}</p> <a href="${site
                          .siteMetadata.siteUrl +
                          edge.node.fields.slug}">thismodernweb.com</a></p>`,
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: {fields: frontmatter___date, order: DESC}) {
                  edges {
                    node {
                      html
                      excerpt
                      fields { slug }
                      frontmatter {
                        title
                        artist
                        status
                        description
                        date
                        tags
                      }
                    }
                  }
                }
              }
            `,
            name: "microblog",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `This Modern Web`,
        short_name: `TMW`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/tmw-favicon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-theme-ui`,
  ],
}
