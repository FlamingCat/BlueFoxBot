const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
console.log("Let's Make Some Pokemon!")
});

client.on('message', message => {
  if (message.channel.type === 'dm') {
    if (!message.content.startsWith("http://pokepast.es/") && !message.content.includes("-")) {
        message.author.send(`Hey ${message.author.username}\nI am an  All Purpose Server-Wide Genning RequestBot. Please send me your http://pokepast.es/ or http://play.pokemonshowdown.com/teambuilder to begin.`);
    }
    else {
        client.channels.find("name", "genning-requests").send(`${message.author.username} Submitted the following team:\n ` + message.content)
        message.author.send("Success!")
    }
  }
});

client.login('MzQyMzI4OTk1MDcwNjA3MzYy.DGOy4Q.QYy6y5xKDjnXYzWt8yYnUf7zOEk');