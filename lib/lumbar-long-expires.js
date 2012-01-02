var exec = require('child_process').exec,
    lumbar = require('lumbar');

module.exports = {
  generateToken: function(command, callback) {
    exec(command, {cwd: lumbar.fileUtil.lookupPath()}, function(err, stdout, stderr) {
      callback(err, (stdout || '').replace(/\n/g, ''));
    });
  },

  generatedFiles: function(context, next) {
    // TODO : Generate the cache buster value and update the config object with this value
  },
  fileName: function(context, next) {
    // TODO : Prepend the cache buster value
  }
};
