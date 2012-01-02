var assert = require('assert'),
    lib = require('../node_modules/lumbar/test/lib'),
    longExpires = require('../lib/lumbar-long-expires');

exports['file-names'] = lib.runTest('test/artifacts/file-names.json', 'test/expected/file-names', {plugins: [longExpires]});

exports['grep'] = function(done) {
  longExpires.generateToken('grep "^v" grep.txt', function(err, token) {
      if (err) {
        throw err;
      }

      assert.eql(token, 'v1.0.1');
      done();
    });
};

exports['git'] = function(done) {
  longExpires.generateToken('git rev-parse test-tag', function(err, token) {
      if (err) {
        throw err;
      }

      assert.eql(token, '7168105e44cecc68073305c5cac8d8d5224d5c2e');
      done();
    });
};

exports['pipe'] = function(done) {
  longExpires.generateToken('cat grep.txt | grep "^v"', function(err, token) {
      if (err) {
        throw err;
      }

      assert.eql(token, 'v1.0.1');
      done();
    });
};
