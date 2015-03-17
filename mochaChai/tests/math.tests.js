var chai = require('chai'),
	assert = chai.assert,  
    expect = chai.expect,
    should = chai.should(),// Note that should has to be executed
    math = require('../lib/math');
 
describe('add', function () {
    it('should return 3 when passed the params (1, 2)', function () {
        expect(math.add(1, 2)).to.equal(3);
        expect(math.add(2,3)).to.equal(5);
    });
});

describe('subtract', function () {
    it('should return -1 when passed the params (1, 2)', function () {
        expect(math.subtract(1, 2)).to.equal(-1);
    });
});

describe('multiply', function(){
	it('should return 2 when passed (1,2)', function() {
		expect(math.multiply(1,2)).to.equal(2);
	});
});

describe('divide', function(){
	it('should return 2 when passed (10,5)', function() {
		expect(math.divide(10,5)).to.equal(2);
	});
});

describe('Foobar', function() {  
  describe('#sayHello()', function() {
    it('should work with assert', function() {
    	result = math.add(1,2);
      assert.equal(result, 3);
      assert.isNumber(result);
    });

    it('should work with expect', function() {
      expect(math.add(1,2)).to.equal(3);
    });

    it('should work with should', function() {
      math.add(1,2).should.equal(3);
    });
  });
});