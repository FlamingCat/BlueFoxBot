const Discord = require('discord.js');
const fs = require("fs");
const config = require('./config.json')
const base = require("./fc/base.json");
const bot = new Discord.Client();
let data
// Data
fs.readFile("./fc/data.json", (err, content) => {
  if(err) {
    console.log("error when reading data.json:\n" + err);
    process.exit(1);
  } else {
      try {
        data = JSON.parse(content);
      } catch (e) {
          console.log("error when parsing data.json:\n" + e);
          process.exit(1);
      }
    }
});
let saveData = () => {
    fs.writeFile("./fc/data.json", JSON.stringify(data), (a) => {(a) ? console.log("error writing save to data.json:\n" + a) : ""})
};
bot.on('ready', () => {
  console.log('My body is Reggie');
  bot.user.setGame('!FC')
  console.log(`Connected as ${bot.user.tag}.`);
});
bot.on('reconnecting', () => {
  console.log('Reconnecting...')
})
bot.on('disconnect', () => {
  console.log('Disconnected.')
})

var prefix = "!"

bot.on('message', message => {
	if (message.author === bot.user) return;
	const userID = message.author.id;
	const guildID = message.guild.id;
	const person = message.mentions.members.first();
	if (!data[guildID]) {
    	data[guildID] = Object.assign({}, base);
    	saveData();
  	}
	if (!data[userID].FC) {
    	data[userID].FC = "";
    	saveData();
  	}
    if (message.content.startsWith(prefix + "FC")) {
        if (!person && message.content.split(" ")[1] == (undefined || null)) {
            message.channel.send("Usage:\n+FC (FC IGN)\nAdds Your FC to the bot so others can see it with +FC @YourName")
        }
        else if (!person) {    
            data[userID].FC = message.content.split(" ")[1]
            saveData();
            message.channel.send("Your FC is now " + data[userID].FC)
        }
        else if (person) {
            if (data[person.id] == undefined || data[person.id].FC == undefined || data[person.id].FC == "") {
                message.channel.send(`${person} hasn\'t registered himself in the database yet.`)
                return;
            }
            message.channel.send(data[person.id].FC)
        }
    }

});
process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error:\n" + err.stack)
})
bot.login('config.token'); 
