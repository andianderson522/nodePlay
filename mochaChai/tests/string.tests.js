var expect = require('chai').expect,
	assert = require('chai').assert,
    string = require('../lib/string');
 
describe('capitalize', function () {
    it('should return "Foo" when passed the param ("foo")', function () {
        expect(string.capitalize('foo')).to.equal('Foo');
        assert.equal(string.capitalize('woo'), 'Woo');
        // expect(string.capitalize(3)).to.throws(Error);
        // assert.throw(string.capitalize(3), 'Error: expected a string');
        try {
        	string.capitalize(3);
        	assert.fail('should have thrown an error');
        } catch (err) {
        	assert.isNotNull(err);
        }
    });
});
 
describe('reverse', function () {
    it('should return "oof" when passed the param ("foo")', function () {
        expect(string.reverse('foo')).to.equal('oof');
    });
});