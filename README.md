# car-drone-server
An application that is used to control RC equipment using a Raspberry PI. It uses Socket.io for data transmission.

Video output is not implemented properly yet. It currently only works with mplayer and can't be run in the browser together with the control application.

This application was built to control a RC car, it can however control nearly anything with only minimal modifications. It can use up to 9 channels when on the raspberry-pi 2 and 8 channels when on the raspberry pi 1.

It controls a Speed Controller. Usually they run at a rate of 50 Hz and the value of a channel is decided by the pulse-length which is 1ms for 0% and 2ms for 100%. You may need to do some modifications to pi-blaster/pi-blaster.c on line 84 and 85 depending on your speed controller.

Tested with NodeJS version 5.3.0.

#setup

This setup guide assumes that you have already installed raspbian.

1. Install NodeJs
2. Get the code `git clone --recursive git://github.com/fela98/car-drone-server.git`
3. cd into the repo directory: `cd ./car-drone-server`
4. Install the node_modules: `npm install`
5. Install the client (run commands inside ./client)
	1. Install bower: `npm install -g bower`
	2. Install all bower_components of the client: `bower install`
7. Install pi-blaster (run commands inside ./pi-blaster)
	1. `sudo apt-get install autoconf`
	2. `./autogen.sh`
	3. `./configure`
	4. `make`
	5. `sudo make install`
8. Start the server: `node server.js`

To make the server start automatically add the following to /etc/rc.local:
`/path/to/repo/start.sh`

This script also starts video streaming automatically.

To playback the video stream on the client, install mplayer run `./video/display-video.sh`