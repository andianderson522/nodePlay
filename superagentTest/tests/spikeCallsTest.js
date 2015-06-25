var superagent = require('superagent');
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

describe("Calls to User service cds:", function(){
    var goodHeader = {
        'key': 'myEndUserKey',
        'Origin': 'http://dev-user-service.condenastdigital.com',
        'Accept':'application/json',
        'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/12.0'
    };

	it('can successfully make an http call', function(done) {
    	superagent.get('http://www.apple.com')
      		.send({
      		})
      		.end(function(err, res) {
        		expect(err).to.not.exist;
				expect(res.status).to.eql(200);
        		done();
		});
  });

	it('get not supported', function(done){
		superagent.get('http://dev-user-service.condenastdigital.com/open/cds/entries')
			.send({})
            .set('Accept','application/xml')
			.end(function(err, res){
				expect(err).to.exist;
				expect(err.status).to.eql(500);
				expect(res.status).to.eql(500);
				done();
		});
	});

    it('post without correct headers fails', function(done){
        superagent.post('http://dev-user-service.condenastdigital.com/open/cds/entries')
            .send({})
            .set('Accept','application/xml')
            .end(function(err, res){
                expect(err).to.exist;
                expect(err.status).to.eql(401);
                expect(res.status).to.eql(401);
                expect(res.clientError).to.be.true;
                expect(res.error.status).to.eql(401);
                expect(res.error.toString()).to.eql('Error: cannot POST /open/cds/entries (401)');
                expect(res.body).to.eql({});
                done();
            });
    });

    it('post with key only fails', function(done){
        superagent.post('http://dev-user-service.condenastdigital.com/open/cds/entries')
            .send({})
            .set('Accept','application/xml')
            .set('key', 'myEndUserKey')
            .end(function(err, res){
                expect(err).to.exist;
                expect(err.status).to.eql(500);
                expect(res.status).to.eql(500);
                expect(res.serverError).to.be.true;
                expect(res.error.status).to.eql(500);
                expect(res.error.toString()).to.eql('Error: cannot POST /open/cds/entries (500)');
                expect(res.body).to.eql({});
                done();
        });
    });

    it('post with just headers fails', function(done){
        superagent.post('http://dev-user-service.condenastdigital.com/open/cds/entries')
            .send({})
            .set('key', 'myEndUserKey')
	        .set('Origin', 'http://stag-user-service.condenastdigital.com/open/cds/entries')
            .set('Accept','application/xml')
            .end(function(err, res){
                expect(err).to.exist;
                expect(err.status).to.eql(401);
                expect(res.status).to.eql(401);
                expect(res.clientError).to.be.true;
                expect(res.error.status).to.eql(401);
                expect(res.error.toString()).to.eql('Error: cannot POST /open/cds/entries (401)');
                expect(res.body).to.eql({});
                done();
        });
    });

    it('good post', function(done){
        superagent.post('http://dev-user-service.condenastdigital.com/open/cds/entries')
            .send({"cdsSubscriptionsRequest":{"cdsSubscriptions":{"cdsSubscription":{"@subscribed":"true","@cdsOfferId":"4745"}},"userEntry":{"@zipCode":"19355","@stateCode":"PA","@lastName":"lastName","@firstName":"firstName","@email":"test@test.com","@countryCode":"US","@city":"frazer","@address2":"address2","@address1":"address1","entryContext":{"@siteCode":"SLF","@formName":"TEST","@application":"CDS","@amgUserId":"900181789"}}}})
	        .type('application/json')
            .set(goodHeader)
            .end(function(err, res){
                expect(err).to.not.exist;
                expect(res.status).to.eql(201);
                expect(res.data).to.not.exist;
                expect(res.text).to.exist;
                expect(res.body).to.exist;
                console.log(res.body);
                var subResponse = res.body.cdsSubscriptionsResponse;
                expect(subResponse).to.exist;
                expect(subResponse.userErrors).to.be.empty;
                var subscriptions = subResponse.cdsSubscriptions;
                expect(subscriptions).to.exist;
                var subscription = subscriptions.cdsSubscription;
                expect(subscription).to.exist;
                console.log(subscription);
                expect(subscription['@adminErrors']).to.eql('false');
                expect(subscription['@cdsOfferId']).to.eql('4745');
                expect(subscription['@success']).to.equal('true');
                expect(subscription['@userErrors']).to.equal('false');
                done();
        });
    });

    it('json api has a body', function(done){
        superagent.get('http://preview-api.style.com/site/api/v1/brand')
        .send({})
        .end(function(err, res){
            expect(res.body).to.exist;
            expect(res.body.pageNumber).to.eql(1);
            done();
        });
    });

});
