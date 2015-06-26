var superagent = require('superagent');
var config = require('../config')();
var log = require('../logger');
var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

describe('Calls to User service /open/cds/entries:', function(){
    log.info(config.baseUrl);
    var path = '/open/cds/entries';
    var type = 'application/json';
    var goodHeader = {
        'key': 'myEndUserKey',
        'Origin': config.baseUrl,
        'Accept':'application/json'
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
		superagent.get(config.baseUrl + path)
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
        superagent.post(config.baseUrl + path)
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
        superagent.post(config.baseUrl + path)
            .send({})
            .set('Accept',type)
            .set('key', 'myEndUserKey')
            .end(function(err, res){
                expect(err).to.exist;
                expect(err.status).to.eql(500);
                expect(res.status).to.eql(500);
                expect(res.serverError).to.be.true;
                expect(res.error.status).to.eql(500);
                expect(res.error.toString()).to.eql('Error: cannot POST /open/cds/entries (500)');
                expect(res.body).to.eql({restError:''});
                done();
        });
    });

    it('post with just headers fails', function(done){
        superagent.post(config.baseUrl + path)
            .send({})
            .set('key', 'myEndUserKey')
	        .set('Origin', config.baseUrl)
            .set('Accept',type)
            .end(function(err, res){
                expect(err).to.exist;
                expect(err.status).to.eql(500);
                expect(res.status).to.eql(500);
                expect(res.clientError).to.be.false;
                expect(res.serverError).to.be.true;
                expect(res.error.status).to.eql(500);
                expect(res.error.toString()).to.eql('Error: cannot POST /open/cds/entries (500)');
                expect(res.body).to.eql({restError:''});
                done();
        });
    });

    it('good post', function(done){
        var requestBody = {
            cdsSubscriptionsRequest: {
                cdsSubscriptions:{
                    cdsSubscription:{
                        '@subscribed':true,
                        '@cdsOfferId':4745
                    }
                },
                userEntry:{
                    '@zipCode':19355,
                    '@stateCode':'PA',
                    '@lastName':'lastName',
                    '@firstName':'firstName',
                    '@email':'test@test.com',
                    '@countryCode':'US',
                    '@city':'frazer',
                    '@address2':'address2',
                    '@address1':'address1',
                    entryContext:{
                        '@siteCode':'SLF',
                        '@formName':'TEST',
                        '@application':'CDS',
                        '@amgUserId':'900181789'
                    }
                }
            }
        };
        superagent.post(config.baseUrl + path)
            .send(requestBody)
	        .type(type)
            .set(goodHeader)
            .end(function(err, res){
                expect(err).to.not.exist;
                expect(res.status).to.eql(201);
                expect(res.data).to.not.exist;
                expect(res.text).to.exist;
                expect(res.body).to.exist;
                log.info(res.body);
                var subResponse = res.body.cdsSubscriptionsResponse;
                expect(subResponse).to.exist;
                expect(subResponse.userErrors).to.be.empty;
                var subscriptions = subResponse.cdsSubscriptions;
                expect(subscriptions).to.exist;
                var subscription = subscriptions.cdsSubscription;
                expect(subscription).to.exist;
                log.info(subscription);
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
