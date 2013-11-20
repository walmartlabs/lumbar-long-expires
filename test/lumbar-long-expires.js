var assert = require('assert'),
    lib = require('../node_modules/lumbar/test/lib'),
    longExpires = require('../lib/lumbar-long-expires');

describe('integration', function() {
  it('should update file names', lib.runTest('test/artifacts/file-names.json', 'test/expected/file-names', {plugins: [longExpires]}));
  it('should update the module map', lib.runTest('test/artifacts/module-map.json', 'test/expected/module-map', {plugins: [longExpires]}));
  it('should update included images paths', lib.runTest('test/artifacts/included-images.json', 'test/expected/included-images', {plugins: [longExpires]}));
  it('should update external references paths', lib.runTest('test/artifacts/index-update.json', 'test/expected/index-update', {plugins: [longExpires]}, '/**/*.{js,css,html}'));
});

/*
 * Toeken Generation Tests
 */
 describe('token generation', function() {
  it('should handle empty tokens', function(done) {
    longExpires.generateToken('', '', function(err, token) {
        if (err) {
          throw err;
        }

        token.should.eql('');
        done();
      });
  });

  it('should handle process execution', function(done) {
    longExpires.generateToken('grep "^v" grep.txt', '', function(err, token) {
        if (err) {
          throw err;
        }

        token.should.eql('v1.0.1');
        done();
      });
  });

  it('should handle git sha parsing', function(done) {
    longExpires.generateToken('git rev-parse test-tag', '', function(err, token) {
        if (err) {
          throw err;
        }

        token.should.eql('7168105e44cecc68073305c5cac8d8d5224d5c2e');
        done();
      });
  });

  it('should execute pipes', function(done) {
    longExpires.generateToken('cat grep.txt | grep "^v"', '', function(err, token) {
        if (err) {
          throw err;
        }

        token.should.eql('v1.0.1');
        done();
      });
  });
});
