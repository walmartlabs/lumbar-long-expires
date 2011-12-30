# Lumbar Long Expires Plugin

[Lumbar](https://github.com/walmartlabs/lumbar) plugin that provides long-expires resource loading for lumbar modules.

## Configuration

To enable this plugin a `long-expires` key must be defined on the root lumbar config
object. The value of this key is the process that is executed to generate expires
cache busting key. This could be a unique id from source control such as the git
commit sha, a timestamp, or any other value that will be unique on each build.

## Example

The following example uses the current git SHA as the unique token.

```javascript
    {
      "modules": [],
      "long-expires": "git rev-parse HEAD"
    }
```
lumbar.json
