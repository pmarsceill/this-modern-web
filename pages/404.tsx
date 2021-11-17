/** @jsxImportSource theme-ui */

import Button from '../components/button'
import GlobalLayout from '../components/global/global-layout'
import Link from 'next/link'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Themed } from '@theme-ui/mdx'

const Custom404: NextPage = () => {
  return (
    <GlobalLayout>
      <NextSeo title="Page not found — This Modern Web" />
      <div sx={{ maxWidth: '800px' }}>
        <h1 sx={{ variant: 'text.pageHeading' }}>
          <span sx={{ color: 'secondary' }}>Server error 404:</span> Page not
          found
        </h1>
        <div className="prose">
          <Themed.p>
            This page does not exist. The URL may be incorrect, the page may
            have been moved, or deleted. In any case, there’s nothing to see
            here...
          </Themed.p>
          <Themed.p>
            <em>ProTip: Everything is available in the Everything Archive.</em>
          </Themed.p>
          <Link href="/archive" passHref>
            <Button as="a" variant="outline">
              Everything Archive
            </Button>
          </Link>
        </div>
      </div>
    </GlobalLayout>
  )
}

export default Custom404
