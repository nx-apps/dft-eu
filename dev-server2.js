//Lets require/import the HTTP module
var http = require('http');
var path = require('path');

//Lets define a port we want to listen to
const PORT=8080; 

//We need a function which handles requests and send response
function handleRequest(req, res){
    //response.
    //path.join(__dirname, '../public', 'index1.html')
    //response.end('It Works!! Path Hit: ' + request.url);
    console.log(path.join(__dirname, './public', 'index.html'));
    res.sendFile(path.join(__dirname, './public', 'index.html'));
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});