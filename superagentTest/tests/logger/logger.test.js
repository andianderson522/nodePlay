var chai = require('chai'),
	assert = chai.assert,
	sinon = require('sinon');
var config = require('../../config')();

describe("Logging setup", function() {
	 before(function () {
        logger = require('../../logger');
    });
	it('test logger setup', function() {
		assert.isNotNull(logger);
		transports = logger.transports;
		assert.isNotNull(transports);
		file = transports.file;
		assert.isNotNull(file);
		assert.equal(file.level, config.level);
		assert.equal(transports.console.level, config.level);
	});
});
describe('stream function', function() {
	before(function() {
		stream = require('../../logger').stream;
	});
	it('test stream', function() {
		assert.isNotNull(stream);
		assert.isFunction(stream.write);
		var spy = sinon.spy(stream, 'write');
		stream.write('hello');
		 assert(stream.write.calledOnce);
	});

});
