import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

/** @jsx jsx */
import { jsx } from "theme-ui"
import moment from "moment"

const PostPagination = (props) => {

  const nextTimeAgo =  (props.next ? moment.utc(props.next.frontmatter.date).fromNow() : "")
  const previousTimeAgo = (props.previous ? moment.utc(props.previous.frontmatter.date).fromNow() : "")
  const nextTitle = (props.next ? props.next.frontmatter.title : "")
  const previousTitle = (props.previous ? props.previous.frontmatter.title : "")

  function NextLabel () {
    if (nextTitle == "" || props.next.frontmatter.date == nextTitle) {
      return nextTimeAgo
    } else {
      return nextTitle
    }
  }

  function PreviousLabel() {
    if (previousTitle == "" || props.previous.frontmatter.date == previousTitle) {
      return previousTimeAgo
    } else {
      return previousTitle
    }
  }


  return (
    <nav
      sx={{
        mt: 5,
      }}
    >
      <ul
        sx={{
          display: "grid",
          listStyle: "none",
          pl: 0,
          m: 0,
          width: "100%",
          gridTemplateColumns: ["1fr 1fr"],
        }}
      >
        <li>
          <span
            sx={{
              fontSize: 0,
              color: "secondary",
              display: "block",
            }}
          >
            previously
          </span>
          {(props.previous && (
            <Link to={props.previous.fields.slug} rel="prev">
              ← <PreviousLabel />
            </Link>
          )) || (
            <Link to="/" rel="prev">
              ← Feed
            </Link>
          )}
        </li>
        <li
          sx={{
            textAlign: "right",
          }}
        >
          <span
            sx={{
              fontSize: 0,
              color: "secondary",
              display: "block",
            }}
          >
            next
          </span>
          {(props.next && (
            <Link to={props.next.fields.slug} rel="next">
              <NextLabel /> →
            </Link>
          )) || (
            <Link to="/" rel="next">
              Feed →
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default PostPagination
