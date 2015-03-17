var chai = require('chai'),
	assert = chai.assert;

describe('Validator tests', function(){
	before(function() {
		validator = require('../../validators');
	});
	it('empty obj returns false', function() {
		assert.isNotNull(validator);
		assert.isTrue(validator.isNullOrEmpty({}));
		assert.isFalse(validator.isNotNullOrEmpty({}));
		assert.isTrue(validator.isNullOrEmpty({}));
		assert.isFalse(validator.isNotNullOrEmpty({}));

	});
	it('null returns true', function() {
		assert.isTrue(validator.isNullOrEmpty(null));
		assert.isFalse(validator.isNotNullOrEmpty(null));
	});
	it('length returns true on empty but not with element', function() {
		obj = [];
		assert.isTrue(validator.isNullOrEmpty(obj));
		assert.isFalse(validator.isNotNullOrEmpty(obj));
		obj.push('a');
		assert.isFalse(validator.isNullOrEmpty(obj));
		assert.isTrue(validator.isNotNullOrEmpty(obj));
	});
	it('a good object', function(){
		obj = {title: 'a'};
		assert.isFalse(validator.isNullOrEmpty(obj));
		assert.isTrue(validator.isNotNullOrEmpty(obj));
	});
});