const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer({
  pageExtensions: ['js', 'ts', 'jsx', 'tsx'],
  images: {
    domains: ['farm8.staticflickr.com', 'i.scdn.co', 'covers.openlibrary.org'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  async redirects() {
    return [
      {
        source: '/inbox',
        destination: '/now',
        permanent: true,
      },
    ]
  },
})
