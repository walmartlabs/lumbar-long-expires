var exec = require('child_process').exec,
    lumbar = require('lumbar');

module.exports = {
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

      module.exports.generateToken(
        context.config.attributes['long-expires'],
        function(err, token) {
          if (ret && token) {
            ret.path = token + '/' + ret.path;
          }
          complete(err, ret);
        });
    });
  }
};
