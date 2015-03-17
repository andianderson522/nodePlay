var chai = require('chai'),
	assert = chai.assert;

describe("Configuration setup", function() {
  	it("should load local configurations", function(next) {
       	var config = require('../../config')();
       	assert.equal(config.mode, 'local');
        assert.equal(config.port, 3000);
        assert.equal(config.level, 'debug');
        next();
    });
    it("should load staging configurations", function(next) {
        var config = require('../../config')('staging');
        assert.equal(config.mode, 'staging');
        assert.equal(config.port, 4000);
        assert.equal(config.level, 'info');
        next();
    });
    it("should load production configurations", function(next) {
        var config = require('../../config')('production');
        assert.equal(config.mode, 'production');
        assert.equal(config.port, 5000);
        assert.equal(config.level, 'warn');
        next();
    });
});