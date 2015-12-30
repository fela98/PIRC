'use strict';

var piblaster = require('pi-blaster.js');
//DEBUGGING!
piblaster.setPwm = function(pin, value) {
	console.log("Set pin " + pin + " to value " + value);
}

var controller = {};

//Wether the controller is enabled and outputting voltages
controller.enabled = false;

//get the channel information
var channels = require('./channels.json');

/**
 * Converts from a percentage of signal to the relative
 * signal to send to the RC equipment. In my case 100%
 * channel value is equal to 10% PWM signal while a
 * channel value of 0% is equal to a 5% PWM signal. You
 * may need to modify this depending on your equipment
 * @param  {Number} percentage The channel value
 * @return {Number}            The output value to send to the RC equipment
 */
function convertSignal(channelValue) {
	return channelValue * 0.05 + 0.05;
};

/**
 * Sets the value of the channels and changes 
 * the PWM frequency if the controller is enabled
 * @param {String} channel The name of the channels
 * @param {Number} value   A floating point number between 0 and 1
 */
controller.set = function(channel, value) {
	channels[channel].value = value;
	if(controller.enabled) {
		//piblaster.setPwm(channels[channel].pin, convertSignal(value));
	}
};

/**
 * Gets the current value of a channel
 * @param  {String} channel The name of the channel
 * @return {Number}         The current value of the channel
 */
controller.get = function(channel) {
	return channels[channel].value;
};

/**
 * Enables all channels if they were previously disabled
 * @return {Boolean} returns true if the controller was enabled, false otherwise
 */
controller.enable = function() {
	if(controller.enabled) return false;
	Object.keys(channels).forEach(function(channelName) {
		piblaster.setPwm(channels[channelName].pin, convertSignal(channels[channelName].value));
	});

	controller.enabled = true;
	return true;
};

/**
 * Disables all channels and outputs stops sending any signals.
 * The values stored in memory however are not altered and can
 * be resumed by calling controller.enable()
 * @return {Boolean} returns true if the controller was enabled, false otherwise
 */
controller.disable = function() {
	if(!controller.enabled) return false;
	var channelsArray = Object.keys(channels);
	channelsArray.forEach(function(channelName) {
		piblaster.setPwm(channelName, 0);
	});

	controller.enabled = false;
	return true;
};

/**
 * Resets all values and enables the controller
 * @return {undefined}
 */
controller.reset = function() {
	Object.keys(channels).forEach(function(channelName) {
		var channel = channels[channelName];

		//Usiing the default value for the channel which is provided with the JSON
		controller.set(channelName, channel.defaultValue);
	});

	controller.enable();
};

module.exports = controller;