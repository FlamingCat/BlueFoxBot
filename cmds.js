const Discord = require('discord.js');
const fs = require("fs");
const config = require('./config.json')
const client = new Discord.Client();

client.on('ready',() => {
	console.log('My body is Reggie');
	console.log('flamerds is the hottest flame');
});

var prefix = "+"
client.on('message', message => {
	if (message.author === client.user) return;
	if (message.author.id.match("281178537841524736")) return;
	if (message.content.startsWith(prefix + 'fc')) {
		message.channel.sendMessage('1736-3622-5725');
	}
	//Hello, i am BlueFoxBot!
	let command1 = message.content.split(" ")[0];
	let command2 = message.content.split(" ")[1];
	let command3 = message.content.split(" ")[2];
	let command4 = message.content.split(" ")[3];

	command1 = command1.toLowerCase()
	command2 = command2.toLowerCase()
	if (command1 + " " + command2 === "i am") {
		if (command4 === undefined) {
			message.channel.send("Hello " + command3 + ", i am BlueFoxBot!")
			return;
		}
		message.channel.send("Hello " + command3 + " " + command4 + ", i am BlueFoxBot!")
	}
	else if (command1 === "i'm" || command1 === "im" || command1 === "iam") {
		if (command3 === undefined) {
			message.channel.send("Hello " + command2 + ", i am BlueFoxBot!")
			return;
		}
		if (command4 === undefined) {
			message.channel.send("Hello " + command2 + " " + command3 + ", i am BlueFoxBot!")
			return;
		}
		message.channel.send("Hello " + command2 + " " + command3 + " " + command4 + ", i am BlueFoxBot!")
	}
});

client.login(config.token); 
