import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

import RssIcon from "../../content/assets/rss.svg"
import ArchiveIcon from "../../content/assets/activity.svg"

/** @jsx jsx */
import { jsx } from "theme-ui"

const AncillaryNav = () => {
  return (
    <div
      sx={{
        mt: [6, "", 0],
      }}
    >
      <ul
        sx={{
          listStyle: "none",
          pl: 0,
          m: 0,
        }}
      >
        <li
          sx={{
            mt: 2,
            mb: 2,
          }}
        >
          <a
            href="/rss.xml"
            sx={{
              fontFamily: "body",
              fontSize: 0,
              color: "secondary",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                color: "accent",
              },
            }}
          >
            <RssIcon sx={{ mr: 1 }} /> RSS
          </a>
        </li>
        <li>
          <Link
            to="archive"
            sx={{
              fontFamily: "body",
              fontSize: 0,
              color: "secondary",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                color: "accent",
              },
            }}
          >
            <ArchiveIcon sx={{ mr: 1 }} /> Everything Archive
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default AncillaryNav
