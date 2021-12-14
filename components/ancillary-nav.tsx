import Link from 'next/link'
import Text from '../components/primitives/text'
import ArchiveIcon from '../public/icons/activity.svg'
import RssIcon from '../public/icons/rss.svg'
import { styled } from '../stitches.config'
import Box from './primitives/box'

const NavAnchor = styled('a', {
  fontFamily: '$body',
  fontSize: '$0',
  color: '$secondary',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    color: '$accent',
  },
})

const AncillaryNav = () => {
  return (
    <Box
      css={{
        mt: '$6',
        '@2': {
          mt: '$0',
        },
      }}
    >
      <Box
        as="ul"
        css={{
          listStyle: 'none',
          pl: '$0',
          m: '$0',
          color: '$secondary',
        }}
      >
        <Box
          as="li"
          css={{
            mb: '$2',
          }}
        >
          <Link href="/rss.xml" passHref>
            <NavAnchor>
              <RssIcon width={16} height={16} viewBox="0 0 24 24" />
              <Text css={{ whiteSpace: 'nowrap', ml: '$1' }}>RSS</Text>
            </NavAnchor>
          </Link>
        </Box>
        <Box as="li">
          <Link href="/archive" passHref>
            <NavAnchor>
              <ArchiveIcon width={16} height={16} viewBox="0 0 24 24" />
              <Text css={{ whiteSpace: 'nowrap', ml: '$1' }}>
                Everything Archive
              </Text>
            </NavAnchor>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default AncillaryNav
