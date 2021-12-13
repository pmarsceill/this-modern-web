import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { PostType } from '../lib/types'

type PostNavProps = {
  previous?: PostType
  next?: PostType
}

const PostNav = ({ previous, next }: PostNavProps) => {
  const previousHref = `/${previous?.year}/${previous?.month}/${previous?.day}/${previous?.slug}`
  const nextHref = `/${next?.year}/${next?.month}/${next?.day}/${next?.slug}`
  const hasPreviousTitle =
    previous?.title && previous?.utcDate !== previous?.title
  const hasNextTitle = next?.title && next?.utcDate !== next?.title

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
          <span
            sx={{
              fontSize: 0,
              color: 'secondary',
              display: 'block',
              fontStyle: 'italic',
            }}
          >
            previously
          </span>
          {previous ? (
            <Link href={previousHref} passHref>
              <a
                rel="previous"
                sx={{ fontSize: 0, fontFamily: 'body', display: 'block' }}
              >
                ←{' '}
                {hasPreviousTitle
                  ? previous.title
                  : `${format(parseISO(previous.date), 'PP')}・${format(
                      parseISO(previous.date),
                      'p'
                    )}`}{' '}
              </a>
            </Link>
          ) : (
            <Link href="/" passHref>
              <a rel="previous">← Feed</a>
            </Link>
          )}
        </li>
        <li sx={{ textAlign: 'right' }}>
          <span
            sx={{
              fontSize: 0,
              color: 'secondary',
              display: 'block',
              fontStyle: 'italic',
            }}
          >
            next
          </span>
          {next ? (
            <Link href={nextHref} passHref>
              <a
                rel="next"
                sx={{ fontSize: 0, fontFamily: 'body', display: 'block' }}
              >
                {hasNextTitle
                  ? next.title
                  : `${format(parseISO(next.date), 'PP')}・${format(
                      parseISO(next.date),
                      'p'
                    )}`}{' '}
                →
              </a>
            </Link>
          ) : (
            <Link href="/" passHref>
              <a rel="next" sx={{ fontSize: 0, display: 'block' }}>
                Feed →
              </a>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default PostNav
