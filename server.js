var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var expressJwt = require('express-jwt');
var socketioJwt = require('socketio-jwt');
var socketIo = require('socket.io');//(http);

var config = require('./config.json');
var index = require('./routes/index');
var tasks = require('./routes/tasks');
var orders = require('./routes/booking');
var users = require('./routes/users');
var researchs = require('./routes/researchs');
var findings = require('./routes/findings');
var port = 5000;

var app = express();
var http = require('http');//.Server(app);
var PythonShell = require('python-shell');


var options = {
  mode: 'text',
  pythonPath: 'home/gil/Desktop/Python-2.7.13rc1',
  pythonOptions: ['-u'],
  scriptPath: 'path/to/my/scripts',
  args: ['value1', 'value2', 'value3']
};

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// use JWT auth to secure the api
app.use(expressJwt({ secret: config.secret }).unless({ path: ['/','/api/users/register','/api/users/authenticate','/favicon.ico'] }));

app.use('/', index);
app.use('/api', tasks);
app.use('/api', orders);
app.use('/api', users);
app.use('/api', researchs);
app.use('/api', findings);

var server = http.createServer(app);
server.listen(process.env.PORT || 5000, function(){
    console.log('Server started on port '+port);
});

var io = socketIo.listen(server);

io.use( socketioJwt.authorize({
  secret: config.secret,
  handshake: true
}));

var online_users=[];
var online_users_set={};
io.on('connection', (socket) => {
    var username = socket.decoded_token.username;
    console.log('User Connected... ' + username);
    online_users_set[username] = {name:username,socket:socket};
    online_users = [];
    Object.keys(online_users_set).forEach(function(key) {
      // var val = online_users_set[key];
      online_users.push({name:key})
    });
    console.log(JSON.stringify(online_users));
    socket.emit('userlist', online_users);
    socket.broadcast.emit('user_connect', {name:username});

    socket.on('disconnect', () => {
        console.log('User Disconnected... ' + username);
        console.log(JSON.stringify(Object.keys(online_users_set)));
        delete online_users_set[username];
        console.log(JSON.stringify(Object.keys(online_users_set)));
        socket.broadcast.emit('user_disconnect', {name:username});
    });

    socket.on('add-message', (message) => {
        console.log("add-message "+ JSON.stringify(message));
        if (online_users_set[message.resivername]){
          let resiveSocket = online_users_set[message.resivername].socket;
          resiveSocket.emit('message', {type: 'new-message', text: message.text,
           sendername: message.sendername, time: message.time});
        }
    });
});
