#!/bin/bash
#Starts a TCP server that streams video with a resolution of 720p encoded with h264 using netcat.
sudo -u pi nohup raspivid -t 0 -w 1280 -h 720 -hf -ih -fps 20 -o - | nc -k -l 2222 > /dev/null 2>&1&