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
