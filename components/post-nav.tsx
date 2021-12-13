import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { PostType } from '../lib/types'
import { styled } from '../stitches.config'
import Anchor from './primitives/anchor'
import Box from './primitives/box'
import Text from './primitives/text'

type PostNavProps = {
  previous?: PostType
  next?: PostType
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

const PostNav = ({ previous, next }: PostNavProps) => {
  const previousHref = `/${previous?.year}/${previous?.month}/${previous?.day}/${previous?.slug}`
  const nextHref = `/${next?.year}/${next?.month}/${next?.day}/${next?.slug}`
  const hasPreviousTitle =
    previous?.title && previous?.utcDate !== previous?.title
  const hasNextTitle = next?.title && next?.utcDate !== next?.title

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
            }}
          >
            previously
          </Text>
          {previous ? (
            <Link href={previousHref} passHref>
              <Anchor
                rel="previous"
                css={{ fontSize: '$0', fontFamily: '$body', display: 'block' }}
              >
                ←{' '}
                {hasPreviousTitle
                  ? previous.title
                  : `${format(parseISO(previous.date), 'PP')}・${format(
                      parseISO(previous.date),
                      'p'
                    )}`}{' '}
              </Anchor>
            </Link>
          ) : (
            <Link href="/" passHref>
              <Anchor
                rel="previous"
                css={{ fontSize: '$0', fontFamily: '$body', display: 'block' }}
              >
                ← Feed
              </Anchor>
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
            }}
          >
            next
          </Text>
          {next ? (
            <Link href={nextHref} passHref>
              <Anchor
                rel="next"
                css={{ fontSize: '$0', fontFamily: '$body', display: 'block' }}
              >
                {hasNextTitle
                  ? next.title
                  : `${format(parseISO(next.date), 'PP')}・${format(
                      parseISO(next.date),
                      'p'
                    )}`}{' '}
                →
              </Anchor>
            </Link>
          ) : (
            <Link href="/" passHref>
              <Anchor
                rel="next"
                css={{ fontSize: '$0', fontFamily: '$body', display: 'block' }}
              >
                Feed →
              </Anchor>
            </Link>
          )}
        </NavLi>
      </NavUl>
    </Box>
  )
}

export default PostNav
