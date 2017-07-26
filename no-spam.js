const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const base = require("./spam/base.json");
const config = require('./config.json')
let data
// Data
fs.readFile("./spam/data.json", (err, content) => {
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
// Data
let saveData = () => {
    fs.writeFile("./spam/data.json", JSON.stringify(data), (a) => {(a) ? console.log("error writing save to data.json:\n" + a) : ""})
};

bot.on('ready', () => {
  console.log('I am reggie!');
});

bot.on('message', message => {
    if (message.author == bot.user) return;
    if (message.channel.name.includes("spam")) return;
    
    const userID = message.author.id;
	const guildID = message.guild.id;
	const person = message.mentions.members.first();
    if (!data[userID]) {
    	data[userID] = Object.assign({}, base);
    	saveData();
  	}
    if (!data[userID].spam) {
    	data[userID].spam = "0";
    	saveData();
  	}
    if (!data[userID].msgs) {
    	data[userID].msgs = "0";
    	saveData();
  	}
    data[userID].msgs++
    setTimeout(() => {
        data[userID].msgs--
    }, 3000)
    if (data[userID].msgs >= 5 && data[userID].msgs <= 7) {
        message.channel.send(`Please calm down,you're sending too many messages, send ${10 - data[userID].msgs} more and you'll be kicked`)
    }
    if (data[userID].msgs >= 10) {
        message.guild.fetchMember(message.author).then(m => {
            message.channel.send(`kicked ${message.author}.`)
            m.kick()
        })
    }
    var ping = message.mentions.users.size
    if (ping > 3) {
        message.channel.send(`Ping Spam Detected, Spammer: ${message.author}, amount of diffrent pings: ${ping}`)
        data[userID].spam++;
        saveData();
        setTimeout(() => {
            data[userID].spam--;
            saveData();
        }, 20000)
    }
    if (data[userID].spam >= 5) {
        message.channel.send(`${message.author} JUST GOT SLAMMED WITH THE BAN HAMMER`)
        message.channel.sendEmbed({
            "title": "SLAMMED",
            "description": `YOU JUST GOT OWNED ${message.author} 😂`
        })
        message.guild.ban(message.author)
    }
});

bot.login(config.token);
