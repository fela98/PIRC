# This scripts starts the video streaming and the http server to control
# the RC car. Execute this from your rc.local to have it running on boot

#TCP server to control the RC car
sudo -u pi nohup /home/pi/.nvm/versions/node/v5.3.0/bin/node server.js > server.log 2>&1&

# Streams video using a TCP Socket.
./video/stream-video.sh
