var chai = require('chai'),
	assert = chai.assert;

describe("Configuration setup", function() {
  	it("should load local configurations", function(next) {
       	var config = require('../../config')('local');
       	assert.equal(config.mode, 'local');
        assert.equal(config.level, 'debug');
		assert.equal(config.baseUrl, 'http://localhost:8080');
        next();
    });
    it("should load staging configurations", function(next) {
        var config = require('../../config')('staging');
        assert.equal(config.mode, 'staging');
        assert.equal(config.level, 'info');
		assert.equal(config.baseUrl, 'https://stag-user-service.condenastdigital.com');
        next();
    });
    it("should load production configurations", function(next) {
        var config = require('../../config')('production');
        assert.equal(config.mode, 'production');
        assert.equal(config.level, 'warn');
		assert.equal(config.baseUrl, 'https://user-service.condenastdigital.com');
        next();
    });
	it("should load ci configurations", function(next) {
        var config = require('../../config')('ci');
        assert.equal(config.mode, 'ci');
        assert.equal(config.level, 'info');
		assert.equal(config.baseUrl, 'http://dev-user-service.condenastdigital.com');
        next();
    });
});
