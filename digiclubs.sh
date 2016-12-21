#!/bin/bash
echo "Setting Up DigiClubs Development Enviornment"
if [ $1 == "a" ];
then
gnome-terminal --geometry=260x25-0+0 --tab -e "bash -c 'mongod --dbpath ~/Development/Database'" --tab -e "bash -c 'cd ~/Development/Digiclubs-Sails/Digiclubs;echo blackflag | sudo -S gulp; read -n1' " --tab -e "bash -c 'google-chrome --new-tab http://localhost:8000; sleep 3;cd ~/Development/Digiclubs-Sails/API;sails lift --prod; read -n1'" --tab -e "bash -c 'subl'" 
else
gnome-terminal --geometry=260x25-0+0 --tab -e "bash -c 'mongod --dbpath ~/Development/Database'" --tab -e "bash -c 'cd ~/Development/Digiclubs-Sails/Digiclubs;echo blackflag | sudo -S gulp; read -n1' " --tab -e "bash -c 'sleep 3;cd ~/Development/Digiclubs-Sails/API;sails lift --prod ;read -n1'"
fi
echo "Ready to go :) "

