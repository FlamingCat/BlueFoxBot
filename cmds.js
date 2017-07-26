const Discord = require('discord.js');
const fs = require("fs");
const config = require("./config.json")
const base = require("./guilds/base.json");
const gbase = require("./guilds/gbase.json");
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
let guild
//Guild
fs.readFile("./guilds/guild.json", (err, content) => {
  if(err) {
    console.log("error when reading guild.json:\n" + err);
    process.exit(1);
  } else {
      try {
        guild = JSON.parse(content);
      } catch (e) {
          console.log("error when parsing guild.json:\n" + e);
          process.exit(1);
      }
    }
});
// Data
let saveData = () => {
    fs.writeFile("./guilds/data.json", JSON.stringify(data), (a) => {(a) ? console.log("error writing save to data.json:\n" + a) : ""})
};
//Guild
let saveGuild = () => {
    fs.writeFile("./guilds/guild.json", JSON.stringify(guild), (a) => {(a) ? console.log("error writing save to guild.json:\n" + a) : ""})
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
	if (!guild[guildID]) {
    	guild[guildID] = Object.assign({}, gbase);
    	saveData();
  	}
	if (!data[userID].steamaccount) {
    	data[userID].steamaccount = "";
    	saveData();
  	}
	if (!data[userID].reddit) {
    	data[userID].reddit = "";
    	saveData();
  	}
	if (message.content.startsWith(prefix + 'fc')) {
		message.channel.sendMessage('1736-3622-5725');
	}
	if (message.content.startsWith(prefix + "modrole")) {
		if (message.content.split(" ")[1] == undefined) {
			message.channel.send("Usage:\n +modrole (name of your moderator_role)\n\nGives The chosen role the rights to some specific commands, like settign the welcome channel, etc.")
			return;
		}
		else {
			if (message.author == message.guild.owner || message.author.id.match("257583488155385856")) {
				guild[guildID].admin_role = message.content.split(" ")[1];
				saveGuild();
				message.channel.send("Successfully set the moderator role to " + message.content.split(" ")[1] + ".")
				return;
			}
			else {
				message.channel.send("only a owner may do this.")
				return;
			}
		}
	}
	if (message.content.startsWith(prefix + "welcome")) {
		if (message.content.split(" ")[1] == undefined) {
			message.channel.send("Usage:\n+welcome (channel)\n\nSets a channel where all join and leave messages will be posted.")
			return;
		}
		else {
			if (!message.member.roles.exists("name", guild[guildID].admin_role)) {
				message.channel.send("only a Moderator May use this command.")
				return;
			}
			else {
				guild[guildID].welcomechannel = message.content.split(" ")[1]
				message.channel.send("you new Welcome channel has been set to " + message.content.split(" ")[1])
				saveGuild();
				return;
			}
		}
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
	if (message.content.startsWith(prefix + "reddit")) {
		if (!person && message.content.split(" ")[1] == (undefined || null)) {
			message.channel.send("Usage:\n+reddit (reddit username)\nAdds Your reddit account to the bot so others can see it with +reddit @YourName")
		}
		else if (!person) {	
			data[userID].reddit = message.content.split(" ")[1]
			saveData();
			message.channel.send("Your new Reddit Account is now " + data[userID].reddit)
		}
		else if (person) {
			if (data[person.id] == undefined || data[person.id].reddit == undefined || data[person.id].reddit == "") {
				message.channel.send(`${person} hasn\'t registered himself in the database yet.`)
				return;
			}
			message.channel.send("https://www.reddit.com/user/" + data[person.id].reddit + "/")
		}
	}
	 //Hello, i am BlueFoxBot!
	/*let command1 = message.content.split(" ")[0];
	let command2 = message.content.split(" ")[1];
	let command3 = message.content.split(" ")[2];
	let command4 = message.content.split(" ")[3];
	if (message.mentions.everyone.valueOf() == 1) return;
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
	}*/
});
client.on("GuildMemberAdd", member => {
	const guild = member.guild
	const guildID = member.guild.id
	if (guild[guildID].welcomechannel == "" || guild[guildID].welcomechannel == undefined) return;
	welcome = member.guild.channel.get(guild[guildID].welcomechannel)
	welcome.send("Welcome to this server, " + member + "!")
})
client.on("GuildMemberRemove", member => {
	const guild = member.guild
	const guildID = member.guild.id
	if (guild[guildID].welcomechannel == "" || guild[guildID].welcomechannel == undefined) return;
	welcome = member.guild.channel.find("name", guild[guildID].welcomechannel)
	welcome.send("Goodbye " + member + " 😢")
})
client.login(config.token); 