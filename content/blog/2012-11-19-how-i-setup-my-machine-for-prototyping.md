---
layout: post
title: "How I Setup My Machine for Prototyping"
date: 2012-11-19 17:27
tags: ["legacy"]
---
A few weeks ago, I wrote <a href="http://cognition.happycog.com/article/its-alive-prototyping-in-the-browser">a post for Cognition</a> explaining my process for creating prototypes and how I arrived there. After being asked for more technical detail around my actual setup, I decided to create this step by step guide.

_Note: This was written for those using a Mac running OSX 10.7 or later._

<!--more-->

### Step 1 &mdash; Install Xcode and the "Command Line Tools"

You can <a href="http://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12" title="Apple Xcode Download">download and install Xcode from Apple's App store</a> after creating a <a href="https://developer.apple.com" target="_blank" title="Apple Developers">Developer Account</a>.

After Xcode is downloaded and installed, there is another step that I always forget about. I mean _always_... And it takes me a good 20 minutes of cursing trying figure out why my compiler is taking a dump.  So here is what you gotta do:  You open up Xcode and select "Preferences..." from the Xcode menu and manually install the "Command Line Tools" by clicking "Downloads" tab, and then the "Install" button next to the item in the list.

 /images/blog/prototype-setup/install-commandline.png Install Command Line Tools

...AND you have to do this step every time you upgrade to the latest version of OSX as well.

###Step 2 &mdash; Install RVM and a non-system version of Ruby

I don't like to muck around with the version of Ruby that comes installed with OSX. <a href="https://rvm.io" title="Ruby Version Manager Project Site">RVM (Ruby Version Manager)</a> is a useful piece of software that lets you have segregated versions of Ruby installed at the same time. This lets us start from a clean Ruby enviroment every time, upgrade very easily, and not have to worry much about system configuration.

_This is where you need to open up Terminal and get busy..._

#### Install RVM &amp; install the latest stable version of Ruby

{% highlight bash %}
$ \curl -L https://get.rvm.io | bash -s stable --ruby
{% endhighlight %}

#### Verify you a running on the newly installed "RVM" version of Ruby
{% highlight bash %}
$ which ruby
/Users/patrickmarsceill/.rvm/rubies/ruby-1.9.3-p327/bin/ruby
{% endhighlight %}
The important thing to note here is the `/.rvm/rubies/ruby-1.9.3-p327`.  Your version numbers may be different, and thats ok but the path should be `/.rvm/rubies/ruby-x.x.x-pxxx`.  If you don't see something like this, you should switch to the newly installed version:
{% highlight bash %}
$ rvm use 1.9.3
{% endhighlight %}
This just tells your machine to switch to Ruby 1.9.3 installed by RVM.  You may have a different version number installed by RVM, in which case you would run `rvm use 1.9.2` or `rvm use 1.9.4`.

### Step 3 &mdash; Install Git

The easiest way to install Git on an OSX machine is to <a href="http://git-scm.com/download/mac">download and install the Universal .dmg file from git-scm.com</a>.  There are other ways to do this from the command line, if you are a Homebrew user like me you can use:

{% highlight bash %}
$ brew install git
{% endhighlight %}

### Step 4 &mdash; Build your development environment

/images/blog/prototype-setup/active-projects.png Active Projects Folder

Create and/or open the folder where you might want to house all your prototyping projects. I like to use a folder called "_active" where all my current projects live.

Switch back over to terminal and CD (change directories) by typing `cd` and then a space, _do not press "Enter" yet_:

{% highlight bash %}
$ cd
{% endhighlight %}

Then drag the folder icon (in this case it's called "_Active") immediately following the space after `cd`.  Like magic, the full path to this location will appear after the `cd`:

{% highlight bash %}
$ cd /Users/patrickmarsceill/Dropbox/_Active
{% endhighlight %}

Press "Enter"

#### Now it's time to get some development tools and start building:

`<controversialname>` "StrapOn" `</controversialname>` is a pre-packaged set of tools and rake commands that I build with the help of my friend <a href="http://stephentudor.com" title="Stephen Tudor's Blog">Stephen</a> for quickly building HTML prototypes.

_From your current location in Terminal run:_
{% highlight bash %}
$ git clone git@github.com:pmarsceill/StrapOn.git
{% endhighlight %}

This will pull down a directory called "StrapOn" that you can use as a starter for your projects.  A more detailed tutorial is in the works, but to get started `cd` into the "StrapOn" directory:

{% highlight bash %}
$ cd StrapOn
{% endhighlight %}

Then install all the tools that are needed for this project by running:

{% highlight bash %}
$ bundle install
{% endhighlight %}

If successful you should see something like this:

{% highlight bash %}
Your bundle is complete! Use `bundle show [gemname]` to see where a bundled gem is installed.
{% endhighlight %}

Start the StrapOn dev mode by running this rake command:
{% highlight bash %}
$ rake start

DEPRECATION WARNING: ActiveSupport::Memoizable is deprecated and will be removed in future releases,simply use Ruby memoization pattern instead. (called from require at /Users/patrickmarsceill/.rvm/rubies/ruby-1.9.3-p327/lib/ruby/site_ruby/1.9.1/rubygems/custom_require.rb:36)


StrapOn starting.....................

DEPRECATION WARNING: ActiveSupport::Memoizable is deprecated and will be removed in future releases,simply use Ruby memoization pattern instead. (called from require at /Users/patrickmarsceill/.rvm/rubies/ruby-1.9.3-p327/lib/ruby/site_ruby/1.9.1/rubygems/custom_require.rb:36)
DEPRECATION WARNING: ActiveSupport::Memoizable is deprecated and will be removed in future releases,simply use Ruby memoization pattern instead. (called from require at /Users/patrickmarsceill/Desktop/StrapOn/config.ru:14)
[2012-11-19 17:02:23] INFO  WEBrick 1.3.1
[2012-11-19 17:02:23] INFO  ruby 1.9.3 (2012-11-10) [x86_64-darwin12.2.0]
[2012-11-19 17:02:23] INFO  WEBrick::HTTPServer#start: pid=30507 port=4000

{% endhighlight %}

Voila, StrapOn has started a local server on your machine that you can use for development by pointing your browser to: `http://localhost:4000`


> <figure class="mb-6">
>   <img src="{{ site.assets-base-url }}images/articles/prototype-setup/strapon-browser.png" class="img-fluid card mb-4" alt="" aria-labelledby="caption-1">
>   <figcaption id="caption-1">
>     StrapOn running on a local machine
>   </figcaption>
> </figure>

This also includes starts an auto-compiler for SASS, and all the built-in templating engine included in the Serve gem. Both of which will be explained in my next post about developing with StrapOn.

### Downloads
* [Command Line Tools (Included in Xcode)](https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12)
* [Ruby Version Manager (RVM)](https://rvm.io/)
* [Git](http://git-scm.com/download/mac)
