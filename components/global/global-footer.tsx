import Link from 'next/link'
import { styled } from '../../stitches.config'
import Box from '../primitives/box'

const NavUl = styled('ul', {
  listStyle: 'none',
  pl: '$0',
  fontSize: '$1',
  display: 'block',

  '@1': {
    display: 'flex',
  },
})

const NavLi = styled('li', {
  mr: '$4',
})

const NavAnchor = styled('a', {
  display: 'inline-block',
  color: '$primary',
  textDecoration: 'none',
  py: '$1',

  '&:hover': {
    color: '$accent',
  },

  '@2': {
    py: '$0',
  },
})

const GlobalFooter = () => {
  return (
    <Box
      as="footer"
      css={{
        fontFamily: '$body',
        fontSize: '$1',
        color: '$secondary',
        py: '$6',
      }}
    >
      <Box css={{ mb: '$2' }}>
        &copy; 2012-{new Date().getFullYear()} Patrick Marsceill.
      </Box>
      <NavUl>
        <NavLi>
          <Link href={'#top'} passHref>
            <NavAnchor>Back to top</NavAnchor>
          </Link>
        </NavLi>
        <NavLi>
          <NavAnchor href="mailto:patrick@thismodernweb.com">
            Email me
          </NavAnchor>
        </NavLi>
        <NavLi>
          <NavAnchor href="https://twitter.com/pmarsceill">Twitter</NavAnchor>
        </NavLi>
        <NavLi>
          <NavAnchor href="https://github.com/pmarsceill" rel="me">
            GitHub
          </NavAnchor>
        </NavLi>
      </NavUl>
    </Box>
  )
}

export default GlobalFooter
