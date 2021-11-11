/** @jsxImportSource theme-ui */

import ArchiveIcon from '../public/icons/activity.svg'
import Link from 'next/link'
import RssIcon from '../public/icons/rss.svg'

const AncillaryNav = () => {
  return (
    <div
      sx={{
        mt: [6, '', 0],
      }}
    >
      <ul
        sx={{
          listStyle: 'none',
          pl: 0,
          m: 0,
        }}
      >
        <li
          sx={{
            mb: 2,
            mt: 2,
          }}
        >
          <Link href="/rss.xml" passHref>
            <a
              sx={{
                fontFamily: 'body',
                fontSize: 0,
                color: 'secondary',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  color: 'accent',
                },
              }}
            >
              <RssIcon
                sx={{ mr: 1 }}
                width={16}
                height={16}
                viewBox="0 0 24 24"
              />
              <span sx={{ whiteSpace: 'nowrap' }}>RSS</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/archive" passHref>
            <a
              sx={{
                fontFamily: 'body',
                fontSize: 0,
                color: 'secondary',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  color: 'accent',
                },
              }}
            >
              <ArchiveIcon
                sx={{ mr: 1 }}
                width={16}
                height={16}
                viewBox="0 0 24 24"
              />
              <span sx={{ whiteSpace: 'nowrap' }}>Everything Archive</span>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default AncillaryNav
