import React from "react"
import { Link } from "gatsby"

/** @jsx jsx */
import { jsx } from "theme-ui"
import { Global } from "@emotion/core"

export default props => {
    const { location, title, children } = props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    // if (location.pathname === rootPath) {
      header = (
        <div
          sx = {{
            mt: 5,
            mb: [3, '', 7],
          }}
        >
	  <h1
	    sx = {{
	      fontFamily: 'title',
	      fontSize: 10,
	      fontWeight: 400,
	      letterSpacing: '-0.07em',
	      lineHeight: 'title',
              wordSpacing: ['10em', '0'],
              mt: 0,
              mb: 2,
	    }}
	  >
	    <Link
	      to = {`/`}
	      sx = {{
		color: 'primary',
		textDecoration: 'none',
	      }}
	    >
	      {title}
	    </Link>
	  </h1>
	  <p
	    sx = {{
	      fontFamily: 'body',
              fontSize: 3,
              mt: 0
	    }}
	  >
	    the personal website of Patrick Marsceill
	  </p>
        </div>
      )
    // } else {
      // header = (
      //   <h3
      //     sx = {{
      //       fontFamily: 'title',
      //     }}
      //   >
      //     <Link
      //       to={`/`}
      //     >
      //       {title}
      //     </Link>
      //   </h3>
      // )
    // }
    return (
      <div
        sx={{
	  maxWidth: 'container',
          mx: 'auto',
          px: [3, 4, 4, 3],
        }}
      >
        <Global
          styles={theme => ({
            '@font-face': {
              fontFamily: 'Optician Sans',
              src: 'url(\'/fonts/Optician-Sans.woff2\') format(\'woff2\'), url(\'/fonts/Optician-Sans.woff\') format(\'woff\')',
              fontWeight: 400,
            },
          })}
        />
        <header>{header}</header>
        <main
          sx = {{
            mb: 6,
            minHeight: 'calc(100vh - 39.2rem)',
          }}
        >
          {children}
        </main>
        <footer
          sx = {{
            fontFamily: "body",
            fontSize: 1,
            color: "secondary",
            pb: 4
          }}
        >
          &copy; 2012-{new Date().getFullYear()} Patrick Marsceill.
          <ul
            sx = {{
              listStyle: 'none',
              pl: 0,
              fontSize: 2,
              display: 'flex',
            }}
          >
            <li
              sx = {{
                mr: 4,
              }}
            >
              <Link
                to = "/"
                sx = {{
                  color: "primary",
                  textDecoration: "none"
                }}
              >
                Back to top
              </Link>
            </li>
            <li
              sx = {{
                mr: 4,
              }}
            >
              <a
                href = "mailto:patrick.marsceill@gmail.com"
                sx = {{
                  color: "primary",
                  textDecoration: "none"
                }}
              >
                Email me
              </a>
            </li>
            <li
              sx = {{
                mr: 4,
              }}
            >
              <a
                href = "https://twitter.com/pmarsceill"
                sx = {{
                  color: "primary",
                    textDecoration: "none"
                }}
              >
                Twitter
              </a>
            </li>
            <li
              sx = {{
                mr: 4,
              }}
            >
              <a
                href = "https://github.com/pmarsceill"
                sx = {{
                  color: "primary",
                    textDecoration: "none"
                }}
              >
                GitHub
              </a>
            </li>
          </ul>
        </footer>
      </div>
    )
  }
