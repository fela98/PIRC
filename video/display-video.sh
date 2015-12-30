#!/bin/bash
#
# This is the bash script used to display the contents of the camera on the client
# you have to install mplayer prior to running this script. It is made for Linux
# But the command does also work on Windows once mplayer is installed.
# 
# replace 192.168.42.1 with the ip of the Raspberry PI

mplayer -fps 200 -demuxer h264es ffmpeg://tcp://192.168.42.1:2222
