import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

/** @jsx jsx */
import { jsx } from "theme-ui"

const Nav = () => {
  const data = useStaticQuery(graphql`
    query navQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            name
            link
          }
        }
      }
    }
  `)

  const menuLinks = data.site.siteMetadata.menuLinks

  return (
    <nav>
      <ul
        sx={{
          display: ["flex", "", "", "block"],
          listStyle: "none",
          my: [5, "", "", 0],
          pl: 0,
          pb: [5, "", "", 0],
          justifyContent: "space-between",
          borderBottom: ["1px solid", "", "", "none"],
          borderColor: "muted",
          position: ["", "", "", "sticky"],
          top: 6,
        }}
      >
        {menuLinks.map((link, index) => (
          <li
            key={index}
            sx={{
              display: "block",
              mt: [0, "", "", 2],
              mb: [0, "", "", 6],
            }}
          >
            <Link
              to={link.link}
              activeClassName="active"
              sx={{
                color: "secondary",
                textDecoration: "none",
                fontFamily: "body",
                fontSize: [1, "", "", 3],
                "&.active": {
                  color: "primary",
                },
              }}
            >
              <span
                sx={{
                  fontFamily: "monospace",
                  mr: [2, "", "", 2],
                }}
              >
                1.{index}
              </span>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
