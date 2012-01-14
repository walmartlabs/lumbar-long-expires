var exec = require('child_process').exec,
    lumbar = require('lumbar'),
    fu = lumbar.fileUtil;

module.exports = {
  priority: 80,

  generateToken: function(command, callback) {
    if (!command) {
      return callback(undefined, '');
    }

    exec(command, {cwd: lumbar.fileUtil.lookupPath()}, function(err, stdout, stderr) {
      callback(err, (stdout || '').replace(/\n/g, ''));
    });
  },

  fileName: function(context, next, complete) {
    // Prepend the cache buster value
    next(function(err, ret) {
      if (err) {
        return complete(err);
      }

      function generatePath(err, token) {
        context.configCache.longExpires = token;

        if (ret && token && (context.mode !== 'static' || !(context.resource['no-expires-token'] || context.resource.root))) {
          ret.path = token + '/' + ret.path;
        }
        complete(err, ret);
      }

      if (context.configCache.longExpires) {
        generatePath(undefined, context.configCache.longExpires);
      } else {
        module.exports.generateToken(
          context.config.attributes['long-expires'],
          generatePath);
      }
    });
  }
};
