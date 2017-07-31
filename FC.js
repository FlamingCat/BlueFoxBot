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
  //bot.user.setGame('+FC')
  console.log(`Connected as ${bot.user.tag}.`);
});
bot.on('disconnect', () => {
  console.log('Disconnected.')
})
bot.on('reconnecting', () => {
  console.log('Reconnecting...')
})
var prefix = "+"
bot.on('message', message => {
	if (message.author === bot.user) return;
	const userID = message.author.id;
	const person = message.mentions.members.first();
	if (!data[userID]) {
    	data[userID] = Object.assign({}, base);
    	saveData();
  	}
	if (!data[userID].FC) {
    	data[userID].FC = "";
    	saveData();
  	}
      if (!data[userID].IGN) {
    	data[userID].IGN = "";
    	saveData();
  	}
    if (message.content.startsWith(prefix + "fc") || message.content.startsWith(prefix + "FC")) {
        if (message.content.split(" ")[1] == undefined) {
            message.channel.send("Usage:\n+FC (FC IGN)\nAdds Your FC and IGN to the bot so others can see it with +FC @YourName")

        }
        else if (!person) {
            data[userID].FC = message.content.split(" ")[1]
            data[userID].IGN = message.content.split(" ")[2]
            saveData();
            message.channel.send("Your FC is now " + message.content.split(" ")[1] +" and your IGN is now " + message.content.split(" ")[2])
        }
        else if (person) {
            message.channel.send(person+"'s FC is: "+data[person.id].FC+" and his IGN is "+data[person.id].IGN)
        }
    }
});

bot.login(config.token); 
