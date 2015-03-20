var chai = require('chai'),
	assert = chai.assert;

describe('fastly controller', function() {
	before(function() {
		controller = require('../../controllers/fastlyController');
		testURL = 'http://stag.style.com';
		errorTitle = 'Fastly Clear Form Errors';
	});
	it('Form prepare works', function() {
		assert.isNotNull(controller);
		result = controller.prepare();
		assert.isNotNull(result);
		assert.equal(result.title, 'Fastly Clear Form');
	});
	it('Form will error with no body', function(){
		body = {};
		result = controller.process(body);
		assert.isNotNull(result);
		assert.deepEqual(result, {error: 'missing post body', title: errorTitle});

	});
	it('Form body missing urls errors', function(){
		body = {key: 'a'};
		result = controller.process(body);
		assert.deepEqual(result, {error: 'missing URL to clear', title: errorTitle});

	});
	it('Form body missing key', function() {
		body = {URL: testURL};
		result = controller.process(body);
		assert.deepEqual(result, {error: 'missing key', title: errorTitle});

	});
	it('Form processing correctly', function() {
		body = {};
		body.URL = testURL;
		body.key = 'a';
		result = controller.process(body);
		assert.isNotNull(result);
		assert.equal(result.title, 'Fastly Clear Success');
	});
});
