/*
This script call the API gateway endpoint which triggers a lambda.
*/

var AWS = require('aws-sdk');

var region = 'us-west-1';
/* 
here just enter the domain if the invoke url is https://X.execute-api.us-west-1.amazonaws.com/staging/client 
then its domain will be like this X.execute-api.us-west-1.amazonaws.com
*/
var domain = 'X.execute-api.us-west-1.amazonaws.com';

var client = {
  "value": "1"
}

registerClient(client);

function registerClient(client) {
  var endpoint = new AWS.Endpoint(domain);
  var request = new AWS.HttpRequest(endpoint, region);
  request.method = 'POST';
  // make sure to not add / in the path as it is appended automatically.
  request.path += 'staging/client'
  request.body = JSON.stringify(client);
  request.headers['host'] = domain;
  request.headers['Content-Type'] = 'application/json';
  request.headers['Content-Length'] = Buffer.byteLength(request.body);

  console.log(request)  
  AWS.config.getCredentials(function(err) {
    if (err) { 
        console.log(err.stack);
    }
    else {
        var signer = new AWS.Signers.V4(request, 'execute-api');
        signer.addAuthorization(AWS.config.credentials, new Date());

        var client = new AWS.HttpClient();
        client.handleRequest(request, null, function(response) {
            console.log(response.statusCode + ' ' + response.statusMessage);
            var responseBody = '';
            response.on('data', function (chunk) {
                responseBody += chunk;
            });
            response.on('end', function (chunk) {
                console.log('Response body: ' + responseBody);
            });
        }, function(error) {
            console.log('Error: ' + error);
        });
    }
  })
}
