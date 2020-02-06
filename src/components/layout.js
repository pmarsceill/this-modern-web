import React from "react"
import { Link } from "gatsby"

/** @jsx jsx */
import { jsx } from "theme-ui"
import { Global } from "@emotion/core"
import Micropub from "../components/micropub"

export default props => {
  const { location, title, fullWidth, pageTitle, children } = props
  const rootPath = `${__PATH_PREFIX__}/`
  const bigHeader =
    location.pathname === rootPath
  let headingTitle

  if (pageTitle) {
    headingTitle = (
      <h1
        sx={{
          position: ["", "", "absolute"],
          right: "0",
          top: "0",
          fontFamily: "heading",
          fontSize: [4, 5],
          fontWeight: "heading",
          letterSpacing: "heading",
          lineHeight: "heading",
          my: 0,
          mt: [5, "", 0],
        }}
      >
        {pageTitle}
      </h1>
    )
  }

  let header

  if (bigHeader) {
    header = (
      <div
        sx={{
          mt: [4, 6, ""],
          mb: [5, "", 6,],
          pb: 5,
          position: "relative",
	  height: ["auto", "12vh", "", "25vh"],
        }}
      >
        <h1
          sx={{
            fontFamily: "title",
            fontSize: [5, 8, "", 9],
            fontWeight: 400,
            letterSpacing: "-0.07em",
            lineHeight: "title",
            wordSpacing: ["20em", "0"],
            mt: 0,
            mb: [0, 2],
          }}
        >
          <Link
            to={`/`}
            sx={{
              color: "primary",
              textDecoration: "none",
            }}
          >
            {title}
          </Link>
        </h1>
        <p
          sx={{
            fontFamily: "body",
            color: "secondary",
            fontSize: [0, 1, 3],
            mt: 0,
          }}
        >
          the personal website of Patrick Marsceill
        </p>
      </div>
    )
  } else {
    header = (
      <div
        sx={{
          mt: [4, 6],
          mb: [5, "", 6 ],
          pb: 5,
	  height: ["auto", "12vh", "", "25vh"],
          position: "relative",
        }}
      >
        <span
          sx={{
            fontFamily: "title",
            fontSize: [5, 6],
            fontWeight: 400,
            letterSpacing: "-0.07em",
            lineHeight: "title",
            wordSpacing: ["20em", "0"],
            mt: 0,
            mb: 0,
            display: "block",
          }}
        >
          <Link
            to={`/`}
            sx={{
              color: "secondary",
              textDecoration: "none",
            }}
          >
            {title}
          </Link>
        </span>
        <p
          sx={{
            fontFamily: "body",
            color: "secondary",
            fontSize: 0,
            mt: 0,
            flex: "auto",
          }}
        >
          the personal website of Patrick Marsceill
        </p>
        {headingTitle}
      </div>
    )
  }

  return (
    <div>
      <div
        sx={{
          maxWidth: "container",
          mx: "auto",
          px: [4, 6, 7, 5],
        }}
      >
        <Micropub />
        <Global
          styles={theme => ({
            "@font-face": {
              fontFamily: "Optician Sans",
              src:
                "url('/fonts/Optician-Sans.woff2') format('woff2'), url('/fonts/Optician-Sans.woff') format('woff')",
              fontWeight: 400,
            },
            "*": {
              boxSizing: "border-box",
            },
            body: {
              margin: 0,
            },
          })}
        />
        <header>{header}</header>
      </div>
      <div
        sx={{
          maxWidth: fullWidth ? "none" : "container",
          mx: "auto",
          px: [4, 6, 7, 5],
        }}
      >
        <main
          sx={{
            mb: 6,
            minHeight: ["", "", "calc(100vh - 389px)"],
          }}
        >
          {children}
        </main>
      </div>
      <div
        sx={{
          maxWidth: "container",
          mx: "auto",
          px: [4, 6, 7, 5],
        }}
      >
        <footer
          sx={{
            fontFamily: "body",
            fontSize: [1],
            color: "secondary",
            pb: 4,
          }}
        >
          &copy; 2012-{new Date().getFullYear()} Patrick Marsceill.
          <ul
            sx={{
              listStyle: "none",
              pl: 0,
              fontSize: 1,
              display: ["block", "flex"],
            }}
          >
            <li
              sx={{
                mr: 4,
              }}
            >
              <Link
                to={location.pathname}
                sx={{
                  display: "inline-block",
                  color: "primary",
                  textDecoration: "none",
                  py: [1, "", 0],
                }}
              >
                Back to top
              </Link>
            </li>
            <li
              sx={{
                mr: 4,
              }}
            >
              <a
                href="mailto:patrick.marsceill@gmail.com"
                sx={{
                  display: "inline-block",
                  color: "primary",
                  textDecoration: "none",
                  py: [1, "", 0],
                }}
              >
                Email me
              </a>
            </li>
            <li
              sx={{
                mr: 4,
              }}
            >
              <a
                href="https://twitter.com/pmarsceill"
                sx={{
                  display: "inline-block",
                  color: "primary",
                  textDecoration: "none",
                  py: [1, "", 0],
                }}
              >
                Twitter
              </a>
            </li>
            <li
              sx={{
                mr: 4,
              }}
            >
              <a
                href="https://github.com/pmarsceill"
                rel="me"
                sx={{
                  display: "inline-block",
                  color: "primary",
                  textDecoration: "none",
                  py: [1, "", 0],
                }}
              >
                GitHub
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  )
}
