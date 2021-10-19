const withMDX = require('@next/mdx')({ extension: /\.(md|mdx)?$/ })
module.exports = withMDX({
  pageExtensions: ['js', 'ts', 'jsx', 'tsx', 'md', 'mdx'],
})
