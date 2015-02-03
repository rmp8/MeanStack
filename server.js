var express = require('express');
var bodyParser = require('body-parser');
//These are needed for passport
var session = require('express-session');
var passport = require('passport');
module.exports.passport = passport;

//Initialize our passport
require('./app/passport')(passport); 

var db = require('./app/database');
var user = require('./app/user');
var queries = require('./app/queries');


var app = express();
//these are needed for sockets
var server = require('http').Server(app);
var io = require('socket.io')(server);

//This middleware is called for every request
app.use(function(req,res,next){
    //Store queries object to request
    req.queries = queries;
    req.passport = passport;
    //Pass to next middleware
    next();
    
});

//Point static files to public folder
app.use('/',express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(session({secret: 'liirumlaarum', saveUninitialized: true, resave: true,cookie:{maxAge:1000}}));
app.use(passport.initialize());
app.use(passport.session());

//Here is my middleware
app.use('/app',user);

//server side socket wait incoming connections
io.on('connection',function(socket){
    //console.log('Client connected');
    //wait message 'new message'
    socket.on('new message',function(data){
        console.log(data);
        //send it to everyone
        io.emit('broadcast_msg',data);
    });
});



server.listen(3000);