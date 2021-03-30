***
# NOTICE:

## This repository has been archived and is not supported.

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)
***
NOTICE: SUPPORT FOR THIS PROJECT HAS ENDED 

This projected was owned and maintained by Walmart. This project has reached its end of life and Walmart no longer supports this project.

We will no longer be monitoring the issues for this project or reviewing pull requests. You are free to continue using this project under the license terms or forks of this project at your own risk. This project is no longer subject to Walmart's bug bounty program or other security monitoring.


## Actions you can take

We recommend you take the following action:

  * Review any configuration files used for build automation and make appropriate updates to remove or replace this project
  * Notify other members of your team and/or organization of this change
  * Notify your security team to help you evaluate alternative options

## Forking and transition of ownership

For [security reasons](https://www.theregister.co.uk/2018/11/26/npm_repo_bitcoin_stealer/), Walmart does not transfer the ownership of our primary repos on Github or other platforms to other individuals/organizations. Further, we do not transfer ownership of packages for public package management systems.

If you would like to fork this package and continue development, you should choose a new name for the project and create your own packages, build automation, etc.

Please review the licensing terms of this project, which continue to be in effect even after decommission.

# Lumbar Long Expires Plugin

[![Build Status](https://secure.travis-ci.org/walmartlabs/lumbar-long-expires.png?branch=master)](http://travis-ci.org/walmartlabs/lumbar-long-expires)

[Lumbar](https://github.com/walmartlabs/lumbar) plugin that provides long-expires resource loading for lumbar modules.

## Configuration

To enable this plugin a `long-expires` key must be defined on the root lumbar config
object. The value of this key is the process that is executed to generate expires
cache busting key. This could be a unique id from source control such as the git
commit sha, a timestamp, or any other value that will be unique on each build.

When in watch mode this value is cached until the configuration is changed. It will
only update when a complete rebuild is done as a result of changing the config file
or restarting the watch.


## Example

The following example uses the current git SHA as the unique token.

```javascript
    {
      "modules": [],
      "plugins": ["lumbar-long-expires"],
      "long-expires": "git rev-parse --short HEAD"
    }
```
lumbar.json
