const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on('ready', () => {
  console.log(`Connected as ${bot.user.tag}.`);
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
  if (Command === "lol") {
    message.channel.send("lul")
  }
});

bot.login('MzM3NTk2NTM5NzUwOTczNDQx.DFJKyw.ll_PtD4U8wiFEizTnAglc_Qahuw');