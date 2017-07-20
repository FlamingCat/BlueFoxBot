const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready',() => {
	console.log('My body is Reggie');
	console.log('flamerds is the hottest flame');
});

var prefix = "+"
client.on('message', message => {
	if (message.author === client.user) return;
	if (message.content.startsWith(prefix + 'fc')) {
		message.channel.sendMessage('1736-3622-5725');
	}
});

client.login(config.token); 
