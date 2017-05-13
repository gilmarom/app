var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('./config.json');

var index = require('./routes/index');
var tasks = require('./routes/tasks');
var orders = require('./routes/booking');
var users = require('./routes/users');
var port = 3000;

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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
//app.use(expressJwt({ secret: config.secret }).unless({ path: ['/login', '/register'] }));

app.use('/', index);
app.use('/api', tasks);
app.use('/api', orders);
app.use('/api', users);

app.listen(port, function(){
    console.log('Server started on port '+port);
});

io.on('connection', (socket) => {
    console.log('User Connected...');

    socket.on('disconnect', () => {
        console.log('User Disconnected...');
    });

    socket.on('add-message', (message) => {
        io.emit('message', {type: 'new-message', text: message});
    });
});

http.listen(8000, () => {
    console.log('Server running on port 8000');
});
