---
layout: "post"
title: "DIY internet privacy"
tags: ["journal", "IPSec", "VPN", "DIY"]
date: "2018-03-27 14:38"
description: "Roll your own VPN for (almost) free"
---

For years Virtual Private Networks have been used by corporations to provide a secure channel to employees for access  to sensitive company data or systems. In simple terms, a VPN server acts as a proxy and all network traffic is routed through it, encapsulated, encrypted and delivered to the end-user. This type of private secure delivery doesn't only have business applications, though.

Internet privacy [laws have been changing](https://www.aclu.org/issues/privacy-technology/internet-privacy/status-internet-privacy-legislation-state). [A lot](https://www.huffingtonpost.com/entry/republicans-are-about-to-kill-rules-banning-internet-providers-from-sharing-your-web-history-without-your-consent_us_58d9a4cbe4b00f68a5ca2c7c). Internet Service Providers have unprecedented access to record and analyze your online activity, and a VPN can be a good defense against such prying. There is also the added benefit of spoofing your geographic location (IP-based geolocation services would pick up the location of the VPN server that you connect to, not your physical location), which is a great way to stream Netflix while vacationing out of the country.

Having a VPN server laying around for this type of personal use has historically been cost-prohibitive. But we live in 2018 now, and cloud-based hosting is very cheap (or free) and a lot of IP security tools are open source. This is great if you're willing to tinker with the setup to make it work for you — which hopefully this post can help with.

## Open Source to the rescue

[Algo VPN](https://blog.trailofbits.com/2016/12/12/meet-algo-the-vpn-that-works/) is an open source VPN server geared toward security and ease-of-use. It comes with IPSec features that make allow you to secure your sessions out-of-the-box.  Here is a quick set up guide and some issues that I ran into while setting it up for the first time.

### 1. Figure out where you want to host this

I choose Digital Ocean because it was easy, required next to no setup, and costs less than five bucks a month (and comes with a ten dollar referral credit). If you want a setup like mine, use this link to create your account... *Note that you don't need to configure a Droplet or anything yet, this will happen automatically later.*

[💁 Sign up for Digital Ocean](https://m.do.co/c/e675b6b6aa8e){: .btn .mb-3 }

### 2. Download the VPN server source locally

[Algo's source is hosted on GitHub](https://github.com/trailofbits/algo), you can download a `zip` file of the source:

[⬇ Algo VPN source (.zip)](https://github.com/trailofbits/algo/archive/master.zip){: .btn .mb-3 }

Extract the `zip` file. This will create a folder called `algo-master`. Rename it to whatever you want and put it somewhere that you'll remember. For the purposes of these instructions, let's rename it `algo-vpn`. The rest of these instructions assume that you're on a Mac, as that is what I used... but there are [Linux and Windows-based docs](https://github.com/trailofbits/algo#deploy-the-algo-server).

### 3. Configure the server locally
Fire up Terminal and `cd` to your `algo-vpn` folder...

The first thing you want to do is check to see if you have `python` installed...

```shell
$ which python
```

You may get back `python not found` (which means you need to install Python 2) or something like `/usr/local/bin/python2` (which means you already have it) or, in my case `python: aliased to python3`...

Algo _requires_ Python 2. If you're unsure what version you're running `python --version` will give you a clue.

```shell
$ python --version
Python 3.6.3
```

So I'm running Python 3 (which I installed from [Homebrew](https://brew.sh)). This means that I need also install Python 2 and tell my computer to use it and not Python 3 for this...

```shell
$ brew install python2
```

Ok, now let's see how my Python versions are setup:

```shell
$ which python
python: aliased to python3
```
```shell
$ python --version
Python 3.6.3
```

👍 I wanted this to remain my default Python for other nerdy shit that I'm into.

```shell
$ python2 --version
Python 2.7.14
```

👍👍 I now have access to Python 2 using `python2` from the command line.

Now we can follow the install instructions from the [Algo GitHub repo](https://github.com/trailofbits/algo), replacing the `python` command to use `python2` instead...

```shell
$ python2 -m virtualenv --python=`which python2` env && source env/bin/activate && python2 -m pip install -U pip && python2 -m pip install -r requirements.txt
```

_but_ this doesn't work because my Python 2 doesn't have the `virtualenv` module installed yet. To install `virtualenv` it, I must use `pip` (Python's built-in package manager). I'm going to use `pip2` here so it explicitly installs it to my Python 2 instance and not my default Python 3 instance. I'm also going to use `sudo` here because the command won't have write access to the proper folders without it, and I'm too lazy to reconfigure access for just this one thing.

```shell
$ sudo pip2 install virtualenv
```

Ok, so let's try it again...

```shell
$ python2 -m virtualenv --python=`which python2` env && source env/bin/activate && python2 -m pip install -U pip && python2 -m pip install -r requirements.txt
```

... ⏰ _this will install a bunch of dependencies_ ⏰ ...

Once you're done installing the dependencies, you can set up your VPN user accounts by editing `config.cfg` to add some usernames to the list (replace `dan` and `jack` with your usernames):

```cfg
# Add as many users as you want for your VPN server here.
# Credentials will be generated for each one.
users:
  - pmarsceill
```

### 4. Setup and deploy to Digital Ocean
This single command will create a Droplet, set it up, and deploy it to your Digital Ocean account:

```shell
$ ./algo
```

You'll need access to a Digital Ocean API key, so you should log in to your Digital Ocean account [and generate one](https://cloud.digitalocean.com/settings/api/tokens). When prompted, paste that API key into the command line.

```
  What provider would you like to use?
    1. DigitalOcean
    2. Amazon Lightsail
    3. Amazon EC2
    4. Microsoft Azure
    5. Google Compute Engine
    6. Scaleway
    7. OpenStack (DreamCompute optimised)
    8. Install to existing Ubuntu 16.04 server

Enter the number of your desired provider
: 1

Enter your API token. The token must have read and write permissions (https://cloud.digitalocean.com/settings/api/tokens):
[pasted values will not be displayed]
:

Name the vpn server:
[algo.local]: FtheFCC
```

Next, choose your location wisely -- remember streaming video services Netflix and HBOGo block restrict access in some countries.

```
  What region should the server be located in?
    1.  Amsterdam        (Datacenter 2)
    2.  Amsterdam        (Datacenter 3)
    3.  Frankfurt
    4.  London
    5.  New York         (Datacenter 1)
    6.  New York         (Datacenter 2)
    7.  New York         (Datacenter 3)
    8.  San Francisco    (Datacenter 1)
    9.  San Francisco    (Datacenter 2)
    10. Singapore
    11. Toronto
    12. Bangalore
Enter the number of your desired region:
[7]: 8
```

Run through the rest of your setup — you can answer `y` to everything.

If all goes well you'll be greeted with this:

```json
ok: [255.255.255.55] => {
    "msg": [
        [
            "\"#                          Congratulations!                            #\"",
            "\"#                     Your Algo server is running.                     #\"",
            "\"#    Config files and certificates are in the ./configs/ directory.    #\"",
            "\"#              Go to https://whoer.net/ after connecting               #\"",
            "\"#        and ensure that all your traffic passes through the VPN.      #\"",
            "\"#               Local DNS resolver 255.255.255.55              #\"",
            ""
        ],
        "    \"#                The p12 and SSH keys password for new users is XXXXXXXX             #\"\n",
        "    \"#                  The CA key password is XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                 #\"\n",
        "    \"#      Shell access: ssh -i configs/algo.pem root@255.255.255.55        #\"\n"
    ]
}
```

Keep this screen handy... you'll need it later.

You should also now be able to log into Digital Ocean and see your VPN server Droplet running:

<img src="images/articles/secure-your-sh*t/digital-ocean.png" class="img-fluid card mb-4" />
The VPN server on Digital Ocean

### 5. Configure a computer to connect to the VPN

In your `algo-vpn` folder, find `configs/xxx.xxx.xxx.xx/username.mobileconfig`. Send this file to the user of the VPN (if they use a Mac or iOS device — if they use Windows or Linux there are equivalent VPN profiles in here). When they open this file they will be prompted with:

<img src="images/articles/secure-your-sh*t/install-profile.png" alt="" class="img-fluid card mb-4" />
VPN profile installation on MacOS

And they can continue through the installation process. Eventually, they will need to enter the password from the previous section (obfuscated with X's), not their system password:

```
"    \"#                The p12 and SSH keys password for new users is XXXXXXXX             #\"\n",
```

Voila, they should be connected automatically. Open up network preferences and they should see something like:

<img src="images/articles/secure-your-sh*t/network-settings.png" alt="" class="img-fluid card mb-4" />
Network settings showing VPN connected on MacOS

I turned off the `connect on demand` option because I like to manually connect to VPN when I need to, not automatically connect when not on a trusted network.
