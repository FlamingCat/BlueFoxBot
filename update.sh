#!/bin/bash

#
#	This script updates BlueFoxBot
#

if [ $EUID == 0 ]; then
	echo "This script must not be run as root"
	exit
fi

git fetch
git pull

