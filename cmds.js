const Discord = require('discord.js');
const fs = require("fs");
const config = require('./config.json')
const base = require("./guilds/base.json");
const client = new Discord.Client();
let data
// Data
fs.readFile("./guilds/data.json", (err, content) => {
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
    fs.writeFile("./guilds/data.json", JSON.stringify(data), (a) => {(a) ? console.log("error writing save to data.json:\n" + a) : ""})
};
client.on('ready',() => {
	console.log('My body is Reggie');
	console.log('flamerds is the hottest flame');
});

var prefix = "+"
client.on('message', message => {
	if (message.author === client.user) return;
	if (message.author.id.match("281178537841524736")) return;
	const userID = message.author.id;
	const guildID = message.guild.id;
	const person = message.mentions.members.first();
	if (!data[userID]) {
    	data[userID] = Object.assign({}, base);
    	saveData();
  	}
	if (!data[userID].steamaccount) {
    	data[userID].steamaccount = "";
    	saveData();
  	}
	if (message.content.startsWith(prefix + 'fc')) {
		message.channel.sendMessage('1736-3622-5725');
	}
	if (message.content.startsWith(prefix + "steam")) {
		if (!person && message.content.split(" ")[1] == (undefined || null)) {
			message.channel.send("Usage:\n+steam (steamid)\nAdds Your steam ID to the bot so others can see it with +steam @YourName\nYou can find your ID if you go to your steam profile and copy the numbers that show up after /profile\n\nshould you instead see something like id/BenCat08 and not numbers, enter that name after /id into this website to find your steamid:\nhttp://steamidfinder.com")
		}
		else if (!person) {	
			data[userID].steamaccount = message.content.split(" ")[1]
			saveData();
			message.channel.send("Your new Steamid is now " + data[userID].steamaccount)
		}
		else if (person) {
			if (data[person.id] == undefined || data[person.id].steamaccount == undefined || data[person.id].steamaccount == "") {
				message.channel.send(`${person} hasn\'t registered himself in the database yet.`)
				return;
			}
			message.channel.send("http://steamcommunity.com/profiles/" + data[person.id].steamaccount + "/")
		}
	}
	//Hello, i am BlueFoxBot!
	let command1 = message.content.split(" ")[0];
	let command2 = message.content.split(" ")[1];
	let command3 = message.content.split(" ")[2];
	let command4 = message.content.split(" ")[3];

	if(!command1 == undefined) {
		command1 = command1.toLowerCase()
	}
	if(!command2 == undefined) {
		command2 = command2.toLowerCase()
	}
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
