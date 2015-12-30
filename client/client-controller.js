'use strict';
(function(io) {
	'use strict';
	//Creates the namespace if it doesn't exist
	var rcdrone = window.rcdrone = {} || window.rcdrone;

	var controller = rcdrone.controller = {};

	var socket = controller.socket = io();

	//All the channels and their default values
	var channels = controller.channels = {
		'throttle': 0.5,
		'steering': 0.5
	};

	//The minimum interval in milliseconds between sending the new channel values
	var minimumInterval = 20;

	var dirty = true;

	//The time of the previous update
	var previousUpdate;

	/**
	 * Sets the value of a channel
	 * @param {String} channel The name of the channel
	 * @param {Number} value   The value of the channel
	 */
	controller.set = function(channel, value) {
		var oldValue = channels[channel];
		if(oldValue !== value) {
			channels[channel] = value;
			checkUpdate();
		}
	};

	/**
	 * Gets the value of a channel
	 * @param  {String} channel The name of the channel
	 * @return {Number}         The value of the channel
	 */
	controller.get = function(channel) {
		return channels[channel];
	};

	//Sends the new channel values to the server
	function update() {
		console.log("Updating values now!");
		socket.emit('update', controller.channels);
		previousUpdate = Date.now();
	};

	/**
	 * Checks whether the channel values should be updated or not
	 * and performs an update correspondingly
	 * @return {undefined}
	 */
	function checkUpdate() {
		if(Date.now() > previousUpdate + minimumInterval && socket.connected) {
			update();
		}
	};

	socket.on('connect', function() {
		console.log('Successfully connected to the server');
		update();
	});

	socket.on('disconnect', function() {
		console.log('Disconneted from server');
	});

})(io);