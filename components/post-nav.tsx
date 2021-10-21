/** @jsxImportSource theme-ui */

import Link from 'next/link'
import PostType from '../types/post'

type PostNavProps = {
  previous?: PostType
  next?: PostType
}

const PostNav = ({ previous, next }: PostNavProps) => {
  const previousHref = `/${previous?.year}/${previous?.month}/${previous?.day}/${previous?.slug}`
  const nextHref = `/${next?.year}/${next?.month}/${next?.day}/${next?.slug}`

  return (
    <nav sx={{ mt: 5 }}>
      <ul
        sx={{
          display: 'grid',
          width: '100%',
          gridTemplateColumns: ['1fr 1fr'],
          listStyle: 'none',
          p: 0,
          m: 0,
        }}
      >
        <li>
          <span sx={{ fontSize: 0, color: 'secondary', display: 'block' }}>
            previously
          </span>
          {previous ? (
            <Link href={previousHref} passHref>
              <a rel="previous">← {previous.title || previous.date}</a>
            </Link>
          ) : (
            <Link href="/" passHref>
              <a rel="previous">← Feed</a>
            </Link>
          )}
        </li>
        <li sx={{ textAlign: 'right' }}>
          <span sx={{ fontSize: 0, color: 'secondary', display: 'block' }}>
            next
          </span>
          {next ? (
            <Link href={nextHref} passHref>
              <a rel="next">{next.title || next.date} →</a>
            </Link>
          ) : (
            <Link href="/" passHref>
              <a rel="next">Feed →</a>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default PostNav
