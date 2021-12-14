import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import GlobalLayout from '../components/global/global-layout'
import Box from '../components/primitives/box'
import Heading from '../components/primitives/heading'
import Prose from '../components/primitives/prose'
import Text from '../components/primitives/text'

const Custom500: NextPage = () => {
  return (
    <GlobalLayout>
      <NextSeo title="Page not found — This Modern Web" />
      <Box css={{ maxWidth: '800px' }}>
        <Heading context="pageHeading">
          <Text css={{ color: '$secondary' }}>Server error 500:</Text> Something
          is wrong
        </Heading>
        <Prose type="longform">
          <p>
            This page failed to load properly from the server. That&apos;s all
            we know right now.
          </p>
          <p>
            <em>
              Please <a href="mailto:patrick@thismodernweb.com">email me</a> for
              more information.
            </em>
          </p>
        </Prose>
      </Box>
    </GlobalLayout>
  )
}

export default Custom500
