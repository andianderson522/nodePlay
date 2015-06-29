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
        //'Origin': config.baseUrl,
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

    it('good oauth call', function(done) {
        log.warn(oauth);
        request.post(config.baseUrl + path)
        .send({})
        .sign(oauth, '','')
        .set(goodHeader)
        //.type(type)
        //.set(goodHeader)

        //.set('X-My', 'Header')
        .end(function(err,res){
            log.info(err);
            console.log(err);
            console.log(res.status, res.body);
            // expect(err).to.not.exist;
            //expect(res.status).to.eql(201);


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
        //oauth._nonceSize=6;
        log.warn(oauth);
        request.post(config.baseUrl + path)
            .sign(oauth, '','')
            .send(requestBody)
            .type(type)
            .set(goodHeader)

            //.set('X-My', 'Header')
            .end(function(err,res){
                log.info(err);
                console.log(err);
                console.log(res.status, res.body);
            //    expect(res.data).to.not.exist;
            //    expect(res.text).to.exist;
            //    expect(res.body).to.exist;
            //    log.debug(res.body);
            //    var subResponse = res.body.cdsSubscriptionsResponse;
            //    expect(subResponse).to.exist;
            //    expect(subResponse.userErrors).to.be.empty;
            //    var subscriptions = subResponse.cdsSubscriptions;
            //    expect(subscriptions).to.exist;
            //    var subscription = subscriptions.cdsSubscription;
            //    expect(subscription).to.exist;
            //    log.debug(subscription);
            //    expect(subscription['@adminErrors']).to.eql('false');
            //    expect(subscription['@cdsOfferId']).to.eql('4745');
            //    expect(subscription['@success']).to.equal('true');
            //    expect(subscription['@userErrors']).to.equal('false');
                done();
        });
        // log.info(request)
    });

    // it('tests trends Twitter API v1.1',function(done){
    // var oauth = new OAuth.OAuth(
      // 'https://api.twitter.com/oauth/request_token',
      // 'https://api.twitter.com/oauth/access_token',
      // 'myKeyInternal',
      // 'mySecretInternal',
      // '1.0A',
      // null,
      // 'HMAC-SHA1'
    // );
    // oauth.get(
      // 'https://api.twitter.com/1.1/trends/place.json?id=23424977',
      // 'your user token for this app', //test user token
      // 'your user secret for this app', //test user secret
      // function (e, data, res){
          // log.warn(res.status);
        // if (e) console.error(e);
        // console.log(require('util').inspect(data));
        // done();
      // });
  // });

});
