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
	it('Form will error with no body', function(){
		req = {};
		result = controller.process(req, {});
		assert.isNotNull(result);
		assert.deepEqual(result, {error: 'missing post body', title: 'Fastly Clear Form Errors'});

	});
	it('Form body missing urls errors', function(){
		req = {body:{key: 'a'}};
		result = controller.process(req,{});
		assert.deepEqual(result, {error: 'missing URLS to clear', title: 'Fastly Clear Form Errors'});

	});
	it('Form processing', function() {
		req = {};
		result = controller.process(req, {});
		assert.isNotNull(result);

	});
});
