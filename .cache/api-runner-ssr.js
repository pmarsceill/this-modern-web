var plugins = [{
      name: 'gatsby-plugin-mdx',
      plugin: require('/workspaces/this-modern-web/node_modules/gatsby-plugin-mdx/gatsby-ssr'),
      options: {"plugins":[{"resolve":"/workspaces/this-modern-web/node_modules/gatsby-remark-unwrap-images","id":"cc481ec3-292b-5813-8135-e38644611fc3","name":"gatsby-remark-unwrap-images","version":"1.0.2","pluginOptions":{"plugins":[]},"nodeAPIs":[],"browserAPIs":[],"ssrAPIs":[]},{"resolve":"/workspaces/this-modern-web/node_modules/gatsby-remark-images","id":"0461dce5-ec21-5335-834c-fa53f5fb806f","name":"gatsby-remark-images","version":"5.11.0","pluginOptions":{"plugins":[],"maxWidth":650,"linkImagesToOriginal":true,"showCaptions":false,"markdownCaptions":false,"sizeByPixelDensity":false,"backgroundColor":"white","quality":50,"withWebp":false,"tracedSVG":false,"loading":"lazy","decoding":"async","disableBgImageOnAlpha":false,"disableBgImage":false},"nodeAPIs":["pluginOptionsSchema"],"browserAPIs":["onRouteUpdate"],"ssrAPIs":[]}],"extensions":[".mdx",".md"],"gatsbyRemarkPlugins":["gatsby-remark-unwrap-images",{"resolve":"gatsby-remark-images","options":{"maxWidth":1200,"showCaptions":true}},{"resolve":"gatsby-remark-responsive-iframe","options":{"wrapperStyle":"margin-bottom: 1.0725rem"}},"gatsby-remark-prismjs","gatsby-remark-copy-linked-files","gatsby-remark-smartypants"],"defaultLayouts":{},"lessBabel":false,"remarkPlugins":[],"rehypePlugins":[],"mediaTypes":["text/markdown","text/x-markdown"],"root":"/workspaces/this-modern-web"},
    },{
      name: 'gatsby-plugin-google-analytics',
      plugin: require('/workspaces/this-modern-web/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackingId":"UA-2709176-11","head":false,"anonymize":false,"respectDNT":false,"exclude":[],"pageTransitionDelay":0,"enableWebVitalsTracking":false},
    },{
      name: 'gatsby-plugin-feed-generator',
      plugin: require('/workspaces/this-modern-web/node_modules/gatsby-plugin-feed-generator/gatsby-ssr'),
      options: {"plugins":[],"generator":"GatsbyJS","rss":true,"json":true,"siteQuery":"\n          {\n            site {\n              siteMetadata {\n                title\n                description\n                siteUrl\n                site_url: siteUrl\n                author\n              }\n            }\n          }\n        ","feeds":[{"query":"\n              {\n                allMdx(\n                  sort: { order: DESC, fields: [frontmatter___date] },\n                ) {\n                  edges {\n                    node {\n                      excerpt\n                      html\n                      fields { slug }\n                      frontmatter {\n                        title\n                        description\n                        artist\n                        status\n                        date\n                        tags\n                      }\n                    }\n                  }\n                }\n              }\n            ","name":"rss"},{"query":"\n              {\n                allMdx(\n                  sort: {fields: frontmatter___date, order: DESC}) {\n                  edges {\n                    node {\n                      html\n                      excerpt\n                      fields { slug }\n                      frontmatter {\n                        title\n                        artist\n                        status\n                        description\n                        date\n                        tags\n                      }\n                    }\n                  }\n                }\n              }\n            ","name":"microblog"}]},
    },{
      name: 'gatsby-plugin-manifest',
      plugin: require('/workspaces/this-modern-web/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"This Modern Web","short_name":"TMW","start_url":"/","background_color":"#ffffff","theme_color":"#663399","display":"minimal-ui","icon":"content/assets/tmw-favicon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"661054a7625a6177ca80f05ba084e21d"},
    },{
      name: 'gatsby-plugin-offline',
      plugin: require('/workspaces/this-modern-web/node_modules/gatsby-plugin-offline/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-react-helmet',
      plugin: require('/workspaces/this-modern-web/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      name: 'gatsby-plugin-theme-ui',
      plugin: require('/workspaces/this-modern-web/node_modules/gatsby-plugin-theme-ui/gatsby-ssr'),
      options: {"plugins":[]},
    }]
/* global plugins */
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

function augmentErrorWithPlugin(plugin, err) {
  if (plugin.name !== `default-site-plugin`) {
    // default-site-plugin is user code and will print proper stack trace,
    // so no point in annotating error message pointing out which plugin is root of the problem
    err.message += ` (from plugin: ${plugin.name})`
  }

  throw err
}

export function apiRunner(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  plugins.forEach(plugin => {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      return
    }

    try {
      const result = apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  })

  return results.length ? results : [defaultReturn]
}

export async function apiRunnerAsync(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  for (const plugin of plugins) {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      continue
    }

    try {
      const result = await apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  }

  return results.length ? results : [defaultReturn]
}
