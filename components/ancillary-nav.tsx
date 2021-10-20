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
            mt: 2,
            mb: 2,
          }}
        >
          <a
            href="/rss.xml"
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
            <RssIcon sx={{ mr: 1 }} /> RSS
          </a>
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
              <ArchiveIcon sx={{ mr: 1 }} /> Everything Archive
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default AncillaryNav
