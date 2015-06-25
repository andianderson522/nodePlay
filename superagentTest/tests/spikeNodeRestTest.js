//Example POST method invocation
var Client = require('node-rest-client').Client;

 describe("Calls to User service cds:", function(){

     it('good post', function(done){
         var client = new Client();
         var args = {
           headers:[{'Accept':'application/json'},{'Content-Type': 'application/json'},{'key': 'myEndUserKey'},{'Origin': 'http://dev-user-service.condenastdigital.com'}],
           //headers:[{'Content-Type': 'application/json'}, {'key': 'myEndUserKey'}, {'Origin': 'http://dev-user-service.condenastdigital.com'}, {'Accept':'application/xml'}],
           //data:"<xml><arg1>hello</arg1><arg2>world</arg2></xml>"
           data : {}

         };

         client.registerMethod("xmlMethod", "http://dev-user-service.condenastdigital.com/open/cds/entries", "POST");
         client.methods.xmlMethod(args,function(data,response){
             // parsed response body as js object
             //console.log(data);
             // raw response
             //console.log(response);
             //console.log(data.toString());
         });
         done();
     });

 });
//var client = new Client();

// set content-type header and data as json in args parameter
//var args = {
  //data: { test: "hello" },
  //headers:{"Content-Type": "application/json"}
//};

//client.post("http://remote.site/rest/xml/method", args, function(data,response) {
    // parsed response body as js object
    //console.log(data);
    //// raw response
    //console.log(response);
//});
