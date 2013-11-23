var _ = require('underscore'),
    exec = require('child_process').exec,
    lumbar = require('lumbar'),
      fu = lumbar.fileUtil,
    Path = require('path');

var waiting;

module.exports = {
  priority: 80,

  generateToken: function(command, path, callback) {
    if (!command) {
      return callback(undefined, '');
    } else if (waiting) {
      waiting.push(callback);
      return;
    }

    waiting = [callback];

    var env = _.clone(process.env);
    if (path) {
      env.PATH = env.PATH ? path + Path.delimiter + env.PATH : path;
    }

    exec(command, {cwd: lumbar.fileUtil.lookupPath(), env: env}, function(err, stdout, stderr) {
      var token = (stdout || '').replace(/\n/g, '');
      _.each(waiting, function(callback) {
        callback(err, token);
      });
      waiting = undefined;
    });
  },

  loadMixin: function(context, next, complete) {
    var loadedLibrary = context.loadedLibrary,
        originalConfig = context.libraries.originalConfig || {};

    if (('long-expires' in loadedLibrary) && !('long-expires' in originalConfig)) {
      context.config.attributes['long-expires'] = loadedLibrary['long-expires'];
      context.config.attributes['long-expires-path'] = loadedLibrary.root;
    }

    next(complete);
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
          context.config.attributes['long-expires-path'],
          generatePath);
      }
    });
  }
};
