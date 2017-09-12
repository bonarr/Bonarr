<p align="center">
Bonarr
</p>

Bonarr is an __independent__ fork of [Radarr](https://github.com/Radarr/Radarr) reworked for automatically downloading adult movies via Usenet and BitTorrent.



## Getting Started


## Downloads



## Support


## Status



## Features

### Current Features

* Bonarr is not functional at this time

### Planned Features



**Note:** All features marked with (\*) are set to be in the first release of Radarr.

#### [Feature Requests](http://feathub.com/Radarr/Radarr)

## Configuring the Development Environment

### Requirements

* [Visual Studio Community](https://www.visualstudio.com/vs/community/) or [MonoDevelop](http://www.monodevelop.com)
* [Git](https://git-scm.com/downloads)
* [Node.js](https://nodejs.org/en/download/)

### Setup

* Make sure all the required software mentioned above are installed
* Clone the repository into your development machine ([*info*](https://help.github.com/desktop/guides/contributing/working-with-your-remote-repository-on-github-or-github-enterprise))
* Grab the submodules `git submodule init && git submodule update`
* Install the required Node Packages `npm install`
* Start gulp to monitor your dev environment for any changes that need post processing using `npm start` command.

> **Notice**  
> Gulp must be running at all times while you are working with Radarr client source files.

### Development

* Open `NzbDrone.sln` in Visual Studio or run the build.sh script, if Mono is installed
* Make sure `NzbDrone.Console` is set as the startup project

### License

* [GNU GPL v3](http://www.gnu.org/licenses/gpl.html)
* Copyright 2010-2017
