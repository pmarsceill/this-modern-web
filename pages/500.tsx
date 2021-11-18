/** @jsxImportSource theme-ui */

import { Themed } from '@theme-ui/mdx'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import GlobalLayout from '../components/global/global-layout'

const Custom500: NextPage = () => {
  return (
    <GlobalLayout>
      <NextSeo title="Page not found — This Modern Web" />
      <div sx={{ maxWidth: '800px' }}>
        <h1 sx={{ variant: 'text.pageHeading' }}>
          <span sx={{ color: 'secondary' }}>Server error 500:</span>{' '}
          Something&apos;s wrong
        </h1>
        <div className="prose">
          <Themed.p>
            This page failed to load properly from the server. That&apos;s all
            we know right now.
          </Themed.p>
          <Themed.p>
            <em>
              Please <a href="mailto:patrick@thismodernweb.com">email me</a> for
              more information.
            </em>
          </Themed.p>
        </div>
      </div>
    </GlobalLayout>
  )
}

export default Custom500
