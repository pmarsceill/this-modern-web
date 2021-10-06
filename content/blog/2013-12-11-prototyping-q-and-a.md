---
layout: post
title: "Prototyping Q&A"
date: 2013-12-11 11:20
tags: ["legacy"]
---

A few months ago <a href="http://happycog.com">Happy Cog&trade;</a> released <a href="https://mijingo.com/products/bundles/the-happy-cog-way">The Happy Cog Way</a>, an instructional video series highlighting our methods and best practices. As part of this series I created a course in <a href="http://mijingo.com/products/screencasts/html-prototyping">HTML Prototyping</a>, a beginners guide to using <a href="http://foundation.zurb.com">Zurb Foundation</a>, <a href="http://sass-lang.com">Sass</a>, and <a href="http://incident57.com/codekit/">CodeKit</a> to create responsive prototypes. Since its release, I've received some really great feedback about my video and the series, including this set of questions that a reader emailed me.

> I'm a front end dev that's been in the business for over 15 years. I've always hand coded my sites, and I've never really gotten into grid systems. (I was working online back int the table days).

Grid systems and “hand coding” are not mutually exclusive. For me, grid systems are just as much of a design tool as they are a development tool. Designers have been using proportional grids to layout designs on paper since the days before the printing press was invented.

<!--more-->

In the context of web development, grids allow designers and developers to layout pages with the consistency and flexibility that modern day web development requires. While it is a good idea to use a grid to help layout your pages, you may not want an entire “front end framework” like Zurb Foundation or Twitter Bootstrap to weigh down your production-level code. At Happy Cog, we use these as tools to get ideas into the browser early, but we don’t use these for production. Here are a few options that still allow a developer to use grid-based designs efficiently in front-end production:

- Roll your own. [Chris Coyier did a pretty good demo here](http://css-tricks.com/dont-overthink-it-grids/). I’m not a super huge fan of using class names like `.col-1-2` so if I were developing a site using this method, I would make all those classes Sass mixins so I could just `@include` them within the element selectors that need to use them.

- Use a light weight grid system framework. [Susy](http://susy.oddbird.net/) is a pretty good example of this. Susy is a Compass based grid framework that easily allows you to customize your grid using Sass mixins. This enables you to keep your CSS class names semantic. [Neat](http://neat.bourbon.io/) is a similar framework that is built on top of Bourbon, if you that is what you prefer.

While both of these options are indeed technically frameworks, they exist purely in the pre-compiled Sass layer, do not contain additional UI elements (unlike Foundation and Bootstrap), and are relatively lightweight in terms of what gets served to the user. I tend to think of them less as frameworks, and more as as set of mathematical functions that make it easier for a developer to quickly divide a page up using proportions, percentages, ems, or pixels.

> Does Happy Cog use foundation for live production websites?

No we do not. Foundation requires you to use a very specific patterns for class names, and markup.

> And has Happy Cog ever taken something that was prototyped out in foundation then converted it into a live website for a client?

Prototypes serve as an alternative to exclusively creating paper wireframes. Their purpose is to more effectively document and communicate designs to our internal and client stakeholders. Frameworks like Foundation allow us to quickly and easily get our ideas into the browser and allow us to think about how things will scale from small to large screens. When prototyping, we aren’t as worried about the quality of the code--but the content, information architecture, and interaction design take priority. Prototyping may also be a good time for developers to get involved in thinking early about how they may approach a problem, while not actually spending time fully executing it.

> If Happy Cog doesn't use foundation or convert their prototypes to live sites, isn't it more work to try and hand code a site later to match your Foundation prototype? (You're re-creating the styes and html but without the "cruft")

Since our prototypes have essentially replaced paper wireframes in most cases--it actually speeds up the design process and facilitates more conversations between our design and development teams. This allows our front end developers to see how elements on the page should behave and then plan for the best possible implementation sooner in the process. If prototyping were not part of our process, we would spend a fairly large chunk of time trying to document the same information on paper--which can be very time consuming. Front end teams would still have to hand code the site based on paper wireframes which inevidably leaves some nuances left undocumented. We’ve found that prototyping provides a more complete and definitive documentation, with clearer direction to stakeholders and developers alike.

<!--aside-one-->

[HTML Prototyping](http://mijingo.com/products/screencasts/html-prototyping/) is available for purchase on [Mijingo.com](http://mijingo.com). For more questions about the prototyping process, [email me](mailto:patrick@thismodernweb.com).
