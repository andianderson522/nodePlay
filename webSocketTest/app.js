var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var urls = [];

function sendTime() {
    io.sockets.emit('time', JSON.parse(fs.readFileSync(__dirname + "/public/data.json", 'utf8')));
    console.log("urls: " + JSON.stringify(urls, null, 4));
}

function writeFile() {
    var time = {
        time: new Date().toJSON()
    }
    fs.writeFile(__dirname + "/public/data.json", JSON.stringify(time, null, 4), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
});
}


setInterval(writeFile, 30000);
// Send current time every 10 secs
setInterval(sendTime, 10000);

server.listen(8001);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});
io.on('connection', function (socket) {
  socket.emit('news', { hello: new Date() });
  socket.on('my other event', function (data) {
    console.log(data);
    urls.push(data);
    
  });
 
});