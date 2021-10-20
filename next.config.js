const withMDX = require('@next/mdx')({ extension: /\.(md|mdx)?$/ })
module.exports = withMDX({
  pageExtensions: ['js', 'ts', 'jsx', 'tsx', 'md', 'mdx'],
})
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
