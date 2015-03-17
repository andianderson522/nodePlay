var chai = require('chai'),
	assert = chai.assert;

describe('Prepare form', function() {
	before(function() {
		controller = require('../../controllers/fastlyController');
	});
	it('Form prepare works', function() {
		assert.isNotNull(controller);
		err = {};
		result = controller.prepare({}, {}, err);
		assert.isNotNull(result);
		assert.equal(result.title, 'Fastly Clear Form');
	});

});