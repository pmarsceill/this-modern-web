import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import Button from '../components/button'
import GlobalLayout from '../components/global/global-layout'
import Box from '../components/primitives/box'
import Heading from '../components/primitives/heading'
import Prose from '../components/primitives/prose'
import Text from '../components/primitives/text'

const Custom404: NextPage = () => {
  return (
    <GlobalLayout>
      <NextSeo title="Page not found — This Modern Web" />
      <Box css={{ maxWidth: '800px' }}>
        <Heading context="pageHeading">
          <Text css={{ color: '$secondary' }}>Server error 404:</Text> Page not
          found
        </Heading>
        <Prose type="longform">
          <p>
            This page does not exist. The URL may be incorrect, the page may
            have been moved, or deleted. In any case, there’s nothing to see
            here...
          </p>
          <p>
            <em>ProTip: Everything is available in the Everything Archive.</em>
          </p>
          <Link href="/archive" passHref>
            <Button as="a" variant="outline">
              Everything archive
            </Button>
          </Link>
        </Prose>
      </Box>
    </GlobalLayout>
  )
}

export default Custom404
