var OAuth = require('oauth');
var request = require('superagent');
require('superagent-oauth')(request);
var config = require('../config')();
var log = require('../logger');
var chai = require('chai'),
    expect = chai.expect;

describe('Calls to Oauth version of CDS', function() {
    log.info(config.baseUrl);
    var path = '/cds/entries';
    var type = 'application/json';
    var oauth;
    var goodHeader = {
        'Accept':'application/json',
        'User-Agent':'Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/12.0'
    };
    before(function() {
        oauth = new OAuth.OAuth(
            config.baseUrl + path,
            config.baseUrl + path,
            'myKey',
            'mySecret',
            '1.0',
            null,
            'PLAINTEXT'
        );
    });

    it('call with no body should error', function(done) {
        request.post(config.baseUrl + path)
        .send({})
        .sign(oauth, '','')
        .set(goodHeader)
        .end(function(err,res){
            expect(err).to.exist;
            expect(err.status).to.equal(500);
            expect(res.status).to.equal(500);
            done();
        });
    });

    it('get should error', function(done) {
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
        request.get(config.baseUrl + path)
        .send(requestBody)
        .sign(oauth, '','')
        .set(goodHeader)
        .end(function(err,res){
            expect(err).to.exist;
            expect(err.status).to.equal(500);
            expect(res.status).to.equal(500);
            done();
        });
    });

    it('Successfully subscribe', function(done){
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
        request.post(config.baseUrl + path)
            .sign(oauth, '','')
            .send(requestBody)
            .type(type)
            .set(goodHeader)
            .end(function(err,res){
                expect(res.data).to.not.exist;
                expect(res.text).to.exist;
                expect(res.body).to.exist;
                log.debug(res.body);
                var subResponse = res.body.cdsSubscriptionsResponse;
                expect(subResponse).to.exist;
                expect(subResponse.userErrors).to.be.empty;
                var subscriptions = subResponse.cdsSubscriptions;
                expect(subscriptions).to.exist;
                var subscription = subscriptions.cdsSubscription;
                expect(subscription).to.exist;
                log.debug(subscription);
                expect(subscription['@adminErrors']).to.eql('false');
                expect(subscription['@cdsOfferId']).to.eql('4745');
                expect(subscription['@success']).to.equal('true');
                expect(subscription['@userErrors']).to.equal('false');
                done();
        });
    });

});
