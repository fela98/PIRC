'use strict';

var controller = require('./controller');
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server/*, {pingTimeout: 500, pingInterval: 200}*/);

// Host the files inside client.
app.use(express.static('./client'));

server.listen(8000, "127.0.0.1", function(err) {
	if(err) throw(err);
	console.log("RC Drone socket.io server is up and running");
});

var channels = require('./channels.json');

io.on('connection', function(socket) {
	var remoteAddress = socket.request.connection.remoteAddress
	console.log("Client " + remoteAddress + " connected");


	socket.on('disconnect', function() {
		console.log("Client " + remoteAddress + " disconnected");
		controller.disable();
	});

	// Emitted when one of the channels has been updated.
	// An object is sent with a floating point value for each
	// channel.
	socket.on('update', function(data) {
		console.log("Got new data!");
		console.log(data);
		Object.keys(data).forEach(function(channelName) {
			var channelValue = data[channelName];
			controller.set(channelName, channelValue);
		});
	});

	controller.reset();
});
