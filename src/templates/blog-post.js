import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TwoCol from "../components/two-col"
import PostPagination from "../components/post-pagination"
import AncillaryNav from "../components/ancillary-nav"

/** @jsx jsx */
import { jsx } from "theme-ui"
import { Styled } from "theme-ui"
import { useColorMode } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { InView } from "react-intersection-observer"
import Img from "gatsby-image"
import moment from "moment"

class BlogPostPage extends React.Component {
  SetColor() {
    const [colorMode, setColorMode] = useColorMode()

    setColorMode("light")
    return null
  }

  constructor(props) {
    super(props)
    this.showSideTitle = this.showSideTitle.bind(this)
    this.state = {
      showSideTitle: false,
    }
  }

  showSideTitle(show) {
    this.setState({
      showSideTitle: show,
    })
  }

  render() {
    const post = this.props.data.mdx
    const { previous, next } = this.props.pageContext
    const sideTitleClass = this.state.showSideTitle ? " show" : ""

    function TimeWarning() {
      const currentYear = new Date().getFullYear()
      const postYear = moment.utc(post.frontmatter.date).format("YYYY")

      if (currentYear - postYear >= 3) {
        return (
          <Styled.root>
            <p sx={{ mt: 0, mb: "1em" }}>
              👋{" "}
              <em>
                Hello reader, this blog post has aged {currentYear - postYear}{" "}
                years since I originally wrote it in {postYear}. That's about{" "}
                {(currentYear - postYear) * 7} internet years you know, so it's
                probably quite stale by now and may not reflect my current
                thinking. I am happy to keep it here for archival purposes, but
                please{" "}
                <a href="mailto:patrick@thismodernweb.com">reach out to me</a>{" "}
                if something feels off or if you're relying on it for any
                serious purpose.{" "}
              </em>
            </p>
            <p sx={{ m: 0 }}>
              <em>
                Thanks,
                <br />
                Patrick
              </em>
            </p>

            <Styled.hr />
          </Styled.root>
        )
      } else {
        return ""
      }
    }

    return (
      <Layout location={this.props.location}>
        <this.SetColor />

        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />

        <article>
          <header
            sx={{
              mb: [5, "", 6],
              maxWidth: ["420px", "100%", "720px"],
              pr: ["", 5, 0, 0],
            }}
          >
            <InView
              as="div"
              onChange={(inView, entry) => this.showSideTitle(!inView)}
            >
              <h1
                sx={{
                  fontFamily: "heading",
                  fontSize: [5, 6, 7],
                  display: "inline",
                  color: "primary",
                  letterSpacing: "heading",
                  lineHeight: "heading",
                  mr: 2,
                }}
              >
                {post.frontmatter.title}
              </h1>
              <h2
                sx={{
                  fontFamily: "heading",
                  fontSize: [5, 6, 7],
                  fontWeight: "bold",
                  color: "secondary",
                  display: "inline",
                  letterSpacing: "heading",
                  lineHeight: "heading",
                }}
              >
                {post.frontmatter.description}
              </h2>
            </InView>
          </header>
          <TwoCol>
            <div
              sx={{
                fontFamily: "body",
                display: "block",
              }}
            >
              <div
                sx={{
                  position: ["", "", "", "", "sticky"],
                  top: 5,
                  mb: [5, 3],
                  mt: 1,
                }}
              >
                <div
                  className={sideTitleClass}
                  sx={{
                    display: "none",
                    lineHeight: "heading",
                    mb: 4,
                    pr: 4,
                    "&.show": {
                      display: ["none", "", "", "", "block"],
                    },
                  }}
                >
                  <span
                    sx={{
                      fontFamily: "heading",
                      fontWeight: "heading",
                      fontSize: [3],
                      display: ["none", "", "inline"],
                      color: "primary",
                      letterSpacing: "heading",
                    }}
                  >
                    {post.frontmatter.title}
                  </span>
                  <span
                    sx={{
                      fontFamily: "heading",
                      fontWeight: "heading",
                      fontSize: [3],
                      display: ["none", "", "inline"],
                      color: "secondary",
                      letterSpacing: "heading",
                      hyphens: "auto",
                      ml: 1,
                    }}
                  >
                    {post.frontmatter.description}
                  </span>
                </div>
                <p
                  sx={{
                    fontSize: [0],
                    color: "secondary",
                    mt: [0, 0, 0, 2],
                  }}
                >
                  {moment.utc(post.frontmatter.date).format("MMMM D, YYYY")}
                </p>
              </div>
            </div>
            <section
              sx={{
                pt: ["", 4, 0, 0],
              }}
            >
              <Styled.root
                sx={{
                  "> p:first-child": {
                    mt: 0,
                  },
                }}
              >
                <TimeWarning />
                <MDXRenderer>{post.body}</MDXRenderer>
              </Styled.root>
            </section>
            <aside>
              <AncillaryNav />
            </aside>
          </TwoCol>
          <Styled.root>
            <footer
              sx={{
                fontFamily: "body",
                fontSize: 1,
                lineHeight: "body",
                borderTop: "1px solid",
                borderColor: "muted",
                marginTop: 6,
              }}
            >
              <PostPagination previous={previous} next={next} />
            </footer>
          </Styled.root>
        </article>
      </Layout>
    )
  }
}

export default BlogPostPage

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date
        description
      }
    }
  }
`
