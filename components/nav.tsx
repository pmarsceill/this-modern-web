import { styled } from '../stitches.config'
import NavLink from './nav-link'

const Nav = () => {
  const NavUl = styled('ul', {
    position: 'sticky',
    display: 'flex',
    listStyle: 'none',
    my: '$5',
    pl: '$0',
    pb: '$5',
    justifyContent: 'space-between',
    borderBottom: '1px solid',
    borderColor: 'muted',
    top: 6,

    '@3': {
      display: 'block',
      my: '$0',
      pb: '$0',
      borderBottom: 'none',
    },
  })

  const NavLi = styled('li', {
    display: 'block',
    mb: '$0',
    color: '$secondary',

    '@3': {
      mb: '$6',
    },
  })

  const NavAnchor = styled('a', {
    color: 'inherit',
    textDecoration: 'none',
    fontFamily: '$body',
    fontSize: '$1',

    '&.active': {
      color: '$primary',
    },

    '@3': {
      fontSize: '$2',
    },
  })

  const NavCounter = styled('span', {
    fontFamily: '$monospace',
    fontSize: '$1',
    mr: '$1',

    '@3': {
      mr: '$2',
    },
  })

  return (
    <nav>
      <NavUl>
        <NavLi css={{ mt: '$0', '@3': { mt: '$4' } }}>
          <NavLink href="/" passHref>
            <NavAnchor>
              <NavCounter>1.0</NavCounter> Feed
            </NavAnchor>
          </NavLink>
        </NavLi>
        <NavLi>
          <NavLink href="/about" passHref>
            <NavAnchor>
              <NavCounter>2.0</NavCounter> About
            </NavAnchor>
          </NavLink>
        </NavLi>
        <NavLi>
          <NavLink href="/now" passHref>
            <NavAnchor>
              <NavCounter>3.0</NavCounter> Now
            </NavAnchor>
          </NavLink>
        </NavLi>
      </NavUl>
    </nav>
  )
}

export default Nav
