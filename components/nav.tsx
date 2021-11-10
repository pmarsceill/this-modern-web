/** @jsxImportSource theme-ui */

import NavLink from './nav-link'
import { ThemeUIStyleObject } from '@theme-ui/css'

const Nav = () => {
  const navItemStyles: ThemeUIStyleObject = {
    display: 'block',
    mb: [0, '', '', 6],
    color: 'secondary',
  }

  const navLinkStyles: ThemeUIStyleObject = {
    color: 'inherit',
    textDecoration: 'none',
    fontFamily: 'body',
    fontSize: [1, '', '', 2],
    '&.active': {
      color: 'primary',
    },
  }

  const navLinkCounterStyles: ThemeUIStyleObject = {
    fontFamily: 'monospace',
    fontSize: 1,
    mr: [1, '', '', 2],
  }

  return (
    <nav>
      <ul
        sx={{
          position: 'sticky',
          display: ['flex', '', '', 'block'],
          listStyle: 'none',
          my: [5, '', '', 0],
          pl: 0,
          pb: [5, '', '', 0],
          justifyContent: 'space-between',
          borderBottom: ['1px solid', '', '', 'none'],
          borderColor: 'muted',
          top: 6,
        }}
      >
        <li sx={{ ...navItemStyles, mt: [0, '', '', 4] }}>
          <NavLink href="/" passHref>
            <a sx={navLinkStyles}>
              <span sx={navLinkCounterStyles}>1.0</span> Feed
            </a>
          </NavLink>
        </li>
        <li sx={navItemStyles}>
          <NavLink href="/about" passHref>
            <a sx={navLinkStyles}>
              <span sx={navLinkCounterStyles}>2.0</span> About
            </a>
          </NavLink>
        </li>
        <li sx={navItemStyles}>
          <NavLink href="/now" passHref>
            <a sx={navLinkStyles}>
              <span sx={navLinkCounterStyles}>3.0</span> Now
            </a>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav