const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on('ready', () => {
console.log("Let's Make Some Pokemon!")
});

client.on('message', message => {
  if (message.channel.type === 'dm') {
    if (!message.content.startsWith("http://pokepast.es/") && !message.content.includes("-")) {
        message.author.send(`Hey ${message.author.username}\nI am an All Purpose Server-Wide Genning RequestBot. Please send me your http://pokepast.es/ or http://play.pokemonshowdown.com/teambuilder to begin.`);
    }
    else {
        client.channels.get("343129767756955651").send(`${message.author.username} Submitted the following team:\n ` + message.content)
        message.author.send("Success!")
    }
  }
});
client.on('guildCreate', newGuild => {
    const invite = newGuild.defaultChannel.createInvite().then( invite => {
      client.channels.get("343144704810156042").sendMessage(`RequestBot was added to a server called "${newGuild.name}".\nServer invite: ${invite}`);
    })
    newGuild.defaultChannel.sendMessage('Thank you for adding me to your Server!, DM me to get started.')
});

client.login(config.token);