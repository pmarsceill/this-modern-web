import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { DocumentTypes } from '../.contentlayer/types'
import { styled } from '../stitches.config'
import Anchor from './primitives/anchor'
import Box from './primitives/box'
import Text from './primitives/text'

type PostNavProps = {
  previous?: DocumentTypes
  next?: DocumentTypes
}

const NavUl = styled('ul', {
  display: 'grid',
  width: '100%',
  gridTemplateColumns: '1fr 1fr',
  listStyle: 'none',
  p: '$0',
  m: '$0',
})

const NavLi = styled('li', {
  m: '$0',
  p: '$0',
})

const NavAnchor = styled(Anchor, {
  color: '$secondary',
  fontSize: '$0',
  fontFamily: '$body',
  display: 'block',
  '&:hover': {
    color: '$accent',
  },
})

const PostNav = ({ previous, next }: PostNavProps) => {
  const previousHref = `/${previous?.year}/${previous?.month}/${previous?.day}/${previous?.slug}`
  const nextHref = `/${next?.year}/${next?.month}/${next?.day}/${next?.slug}`
  const hasPreviousTitle = previous?.title
  const hasNextTitle = next?.title

  return (
    <Box as="nav" css={{ mt: '$5' }}>
      <NavUl>
        <NavLi>
          <Text
            css={{
              fontSize: '$0',
              color: '$secondary',
              display: 'block',
              fontStyle: 'italic',
              fontFamily: '$serif',
            }}
          >
            previously
          </Text>
          {previous ? (
            <Link href={previousHref} passHref>
              <NavAnchor rel="previous">
                ←{' '}
                {hasPreviousTitle
                  ? previous.title
                  : `${format(parseISO(previous.date), 'PP')}・${format(
                      parseISO(previous.date),
                      'p'
                    )}`}{' '}
              </NavAnchor>
            </Link>
          ) : (
            <Link href="/" passHref>
              <NavAnchor rel="previous">⤴ Feed</NavAnchor>
            </Link>
          )}
        </NavLi>
        <NavLi css={{ textAlign: 'right' }}>
          <Text
            css={{
              fontSize: '$0',
              color: '$secondary',
              display: 'block',
              fontStyle: 'italic',
              fontFamily: '$serif',
            }}
          >
            next
          </Text>
          {next ? (
            <Link href={nextHref} passHref>
              <NavAnchor rel="next">
                {hasNextTitle
                  ? next.title
                  : `${format(parseISO(next.date), 'PP')}・${format(
                      parseISO(next.date),
                      'p'
                    )}`}{' '}
                →
              </NavAnchor>
            </Link>
          ) : (
            <Link href="/" passHref>
              <NavAnchor rel="next">Feed ⤴︎</NavAnchor>
            </Link>
          )}
        </NavLi>
      </NavUl>
    </Box>
  )
}

export default PostNav
