var chai = require('chai'),
	assert = chai.assert,
	request = require('supertest'),
	sinon = require('sinon');

/*
describe("Routes", function() {
  describe("GET /", function() {
  		before(function(){
  			index = require('../../routes');
  		});
      it("should respond", function() {
        var req,res,spy;
        req = res = {};
        spy = res.send = sinon.spy();
        index.get(req, res);
        assert.true(spy.calledOnce);
      });     
  });
});
*/
/*
describe('Routing', function() {
  var url = 'http://localhost:3000';
  before(function(done) {
    done();
  });
    it('should correctly update an existing account', function(done){
    var body = {
    };
    request(url)
        .get('/')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(200) //Status code
        .end(function(err,res) {
            if (err) {
                throw err;
            }
            // Should.js fluent syntax applied
            // res.body.should.have.property('_id');
                    //res.body.firstName.should.equal('JP');
                    //res.body.lastName.should.equal('Berd');                    
                    //res.body.creationDate.should.not.equal(null);
            done();
        });
    });
  });
  */