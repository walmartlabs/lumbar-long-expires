var assert = require('assert'),
    lib = require('../node_modules/lumbar/test/lib'),
    longExpires = require('../lib/lumbar-long-expires');

exports['file-names'] = lib.runTest('test/artifacts/file-names.json', 'test/expected/file-names', {plugins: [longExpires]});
exports['module-map'] = lib.runTest('test/artifacts/module-map.json', 'test/expected/module-map', {plugins: [longExpires]});
exports['included-images'] = lib.runTest('test/artifacts/included-images.json', 'test/expected/included-images', {plugins: [longExpires]});
exports['index-update'] = lib.runTest('test/artifacts/index-update.json', 'test/expected/index-update', {plugins: [longExpires]}, '/**/*.{js,css,html}');

/*
 * Toeken Generation Tests
 */
exports['empty-token'] = function(done) {
  longExpires.generateToken('', function(err, token) {
      if (err) {
        throw err;
      }

      assert.eql(token, '');
      done();
    });
};

exports['grep'] = function(done) {
  longExpires.generateToken('grep "^v" grep.txt', function(err, token) {
      if (err) {
        throw err;
      }

      assert.eql(token, 'v1.0.1');
      done();
    });
};

/*
Removed as this is prone to errors due to partial repo checkouts (travis does this)

exports['git'] = function(done) {
  longExpires.generateToken('git rev-parse test-tag', function(err, token) {
      if (err) {
        throw err;
      }

      assert.eql(token, '7168105e44cecc68073305c5cac8d8d5224d5c2e');
      done();
    });
};
*/

exports['pipe'] = function(done) {
  longExpires.generateToken('cat grep.txt | grep "^v"', function(err, token) {
      if (err) {
        throw err;
      }

      assert.eql(token, 'v1.0.1');
      done();
    });
};
