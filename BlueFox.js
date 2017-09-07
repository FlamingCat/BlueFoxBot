const Discord = require("discord.js");
const fs = require("fs");
const config = require('./config.json')
const bot = new Discord.Client();

bot.on('ready', () => {
  console.log('My body is Reggie');
	bot.user.setGame('Foxin around')
  console.log(`Connected as ${bot.user.username}.`);
});
bot.on('disconnect', () => {
  console.log('Disconnected.')
})
bot.on('reconnecting', () => {
  console.log('Reconnecting...')
})
bot.on('message', message => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  if (message.author.id.match("281178537841524736")) return;
  const prefix = "+"
  if (!message.content.startsWith(prefix)) return;
  var Command = message.content
  Command = Command.toLowerCase().split("+");
  Command = Command.join("")
  if (Command === 'help') {
    message.channel.send("```+reddit\nAdd your reddit profile to the databse, can be seen with +reddit (Ping)\n\n+steam\nAdd your Steam profile to the databasem can be seen with +steam (ping)\n\n+avy\nSends The link to your discord AVY```")
  }
  if (Command === 'avy') {
    // Send the user's avatar URL
    message.channel.send(message.author.avatarURL);
  }
  if (Command === "lol") {
    message.channel.send("lul")
  }
});

bot.login(config.token);
