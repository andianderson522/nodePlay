var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  // console.log(socket);
  var user = 'User' + users.length;
  users.push(user);
  console.log(JSON.stringify(users, null, 4));
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', user + ": " + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});