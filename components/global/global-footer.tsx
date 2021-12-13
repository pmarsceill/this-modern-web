import Link from 'next/link'

const GlobalFooter = () => {
  return (
    <footer
      sx={{
        fontFamily: 'body',
        fontSize: [1],
        color: 'secondary',
        py: 6,
      }}
    >
      <div sx={{ mb: 2 }}>
        &copy; 2012-{new Date().getFullYear()} Patrick Marsceill.
      </div>
      <ul
        sx={{
          listStyle: 'none',
          pl: 0,
          fontSize: 1,
          display: ['block', 'flex'],
        }}
      >
        <li
          sx={{
            mr: 4,
          }}
        >
          <Link href={'#top'} passHref>
            <a
              sx={{
                display: 'inline-block',
                color: 'primary',
                textDecoration: 'none',
                py: [1, '', 0],
              }}
            >
              Back to top
            </a>
          </Link>
        </li>
        <li
          sx={{
            mr: 4,
          }}
        >
          <a
            href="mailto:patrick@thismodernweb.com"
            sx={{
              display: 'inline-block',
              color: 'primary',
              textDecoration: 'none',
              py: [1, '', 0],
            }}
          >
            Email me
          </a>
        </li>
        <li
          sx={{
            mr: 4,
          }}
        >
          <a
            href="https://twitter.com/pmarsceill"
            sx={{
              display: 'inline-block',
              color: 'primary',
              textDecoration: 'none',
              py: [1, '', 0],
            }}
          >
            Twitter
          </a>
        </li>
        <li
          sx={{
            mr: 4,
          }}
        >
          <a
            href="https://github.com/pmarsceill"
            rel="me"
            sx={{
              display: 'inline-block',
              color: 'primary',
              textDecoration: 'none',
              py: [1, '', 0],
            }}
          >
            GitHub
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default GlobalFooter
