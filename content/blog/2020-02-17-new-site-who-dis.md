---
title: 'This modern what?'
description: 'A new decade, a new site, and a new name'
date: 2020-02-17T15:29:38-0500
tags: ['journal', 'new site', 'This Modern Web']
featuredImage: /assets/new-site-who-dis/tmw.png
colorMode: 'dark'
---

Every year or so I get the itch to start redesigning my personal site with the intention of writing more, showcasing more work, and generally creating more things to put on the internet. About six months ago, I started gathering ideas for what exactly I wanted the next iteration of my personal site to be, how I wanted it to be presented, and what _I_ wanted to get out the process.

Growing up as an early consumer of the internet in the late 90s, I had a desire to join the ranks of those creating for this new space. I found my way to a few dozen websites/zines/portals/blogs/whatever geared towards _making_. I was immediately drawn in and wanted to soak up as much as possible. Many of these sites had a distinct identity of their own beyond that of the author(s) that wrote them. Specifically in the "web design" community, my digital worldview was shaped by the likes of [K10k](https://web.archive.org/web/20030207162038/http://www.k10k.net:80/), [Stop Design](http://v2.stopdesign.com/), [Daring Fireball](https://daringfireball.net), [Design Is Kinky](https://web.archive.org/web/20020802043308/http://designiskinky.com/index_main.html), [swissmiss](https://web.archive.org/web/20051202063834/http://swissmiss.typepad.com/), and others. Once again almost twenty-years later, these pioneering sites inspired me to detach my personal home on the web from my own namesake, giving birth to _This Modern Web_.

This new site is broken down into three different types of content:

1. Long-form content, like this blog post.
2. Microblogs that take the form of short posts, photos, and links, shown on the [home/feed page](/) and on the [Everything Archive](/archive) in monospace.
3. The [Inbox](/inbox), which is a media diary of what I am reading, listening to, or watching.

Beyond the content that I am producing, I wanted more control over the process by which it is produced. This led me to explore many ways of _building_ this site and my ideal workflows for publishing each type of content. I ultimately choose to go with [Gatsby.js](https://gatsbyjs.com) as the framework to build this thing for two reasons:

- I wanted an excuse to build a JavaScript/React based site and play in all of the possibilities that come with this landscape.

- I wanted more flexibility than [Jekyll](https://jekyllrb.com) (my previous static site generator) has out-of-the-box. I love Jekyll and still use it for many things, but there are many things that it leaves to be desired for a website in 2020, like processing assets, SEO, a modern data layer, a more dynamic front end, and flexibility in working with Markdown.

Once I got over the initial learning curve of going from the familiar and fairly boundaried world of Jekyll to the unknown and expansive possibilities of Gatsby, I found the experience of building the site to be quite joyful. Thanks to [Theme UI](https://themeui.com), styling the site was felt familiar and much of the heavy lifting that I normally need to do (with utility classes or custom CSS frameworks) was all there for me and completely customizable to however I wanted to setup my design constraints. It's responsive out-of-the-box and I didn't have to write one media query. _It feels like cheating_. And hell, this whole process even finally converted me to a CSS-in-JS disciple.

Of all the new stuff though, my biggest improvement was making the content creation workflow more ergonomic. I was heavily inspired by [Muan's personal site](https://muan.co) which is purely Microblog / Micropub-based collection of "notes". I love the idea of a personal site with short low-commitment posts as it harkens back to all those early blogs that had their own "news feeds". I toyed around with this before on the last iteration of my site, but it never really felt like I had the right implementation. Behind the scenes, I used Muan's [micropub-content](https://github.com/muan/micropub-content) as a template for how to build the [Micropub standard](https://www.w3.org/TR/micropub/) into a static site-generator like Gatsby as well as a fork of [micropub-endpoint](https://github.com/muan/micropub-endpoint) to actually handle the posting of content. On the client side, I'm using the [Micro.blog iOS](https://apps.apple.com/us/app/micro-blog/id1253201335) app to write the short posts which is as easy as writing a tweet on my phone. The content gets created in the GitHub repo, Netlify automatically deploys it and the post goes live — just like posting a tweet.
