var chai = require('chai'),
	assert = chai.assert;

describe('fastly controller', function() {
	before(function() {
		controller = require('../../controllers/fastlyController');
	});
	it('Form prepare works', function() {
		assert.isNotNull(controller);
		err = {};
		result = controller.prepare({}, {});
		assert.isNotNull(result);
		assert.equal(result.title, 'Fastly Clear Form');
	});
	it('Form processing', function() {
		req = {};
		result = controller.process(req, {});
		assert.isNotNull(result);

	});
});
