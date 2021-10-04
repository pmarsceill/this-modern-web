module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-mdx/gatsby-browser.js'),
      options: {"plugins":[{"resolve":"/workspaces/this-modern-web/node_modules/gatsby-remark-unwrap-images","id":"cc481ec3-292b-5813-8135-e38644611fc3","name":"gatsby-remark-unwrap-images","version":"1.0.2","pluginOptions":{"plugins":[]},"nodeAPIs":[],"browserAPIs":[],"ssrAPIs":[]},{"resolve":"/workspaces/this-modern-web/node_modules/gatsby-remark-images","id":"0461dce5-ec21-5335-834c-fa53f5fb806f","name":"gatsby-remark-images","version":"5.11.0","pluginOptions":{"plugins":[],"maxWidth":650,"linkImagesToOriginal":true,"showCaptions":false,"markdownCaptions":false,"sizeByPixelDensity":false,"backgroundColor":"white","quality":50,"withWebp":false,"tracedSVG":false,"loading":"lazy","decoding":"async","disableBgImageOnAlpha":false,"disableBgImage":false},"nodeAPIs":["pluginOptionsSchema"],"browserAPIs":["onRouteUpdate"],"ssrAPIs":[]}],"extensions":[".mdx",".md"],"gatsbyRemarkPlugins":["gatsby-remark-unwrap-images",{"resolve":"gatsby-remark-images","options":{"maxWidth":1200,"showCaptions":true}},{"resolve":"gatsby-remark-responsive-iframe","options":{"wrapperStyle":"margin-bottom: 1.0725rem"}},"gatsby-remark-prismjs","gatsby-remark-copy-linked-files","gatsby-remark-smartypants"],"defaultLayouts":{},"lessBabel":false,"remarkPlugins":[],"rehypePlugins":[],"mediaTypes":["text/markdown","text/x-markdown"],"root":"/workspaces/this-modern-web"},
    },{
      plugin: require('../node_modules/gatsby-remark-images/gatsby-browser.js'),
      options: {"plugins":[],"maxWidth":650,"linkImagesToOriginal":true,"showCaptions":false,"markdownCaptions":false,"sizeByPixelDensity":false,"backgroundColor":"white","quality":50,"withWebp":false,"tracedSVG":false,"loading":"lazy","decoding":"async","disableBgImageOnAlpha":false,"disableBgImage":false},
    },{
      plugin: require('../node_modules/gatsby-plugin-google-analytics/gatsby-browser.js'),
      options: {"plugins":[],"trackingId":"UA-2709176-11","head":false,"anonymize":false,"respectDNT":false,"exclude":[],"pageTransitionDelay":0,"enableWebVitalsTracking":false},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"This Modern Web","short_name":"TMW","start_url":"/","background_color":"#ffffff","theme_color":"#663399","display":"minimal-ui","icon":"content/assets/tmw-favicon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"661054a7625a6177ca80f05ba084e21d"},
    },{
      plugin: require('../node_modules/gatsby-plugin-offline/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-theme-ui/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
