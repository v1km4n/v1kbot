const Discord = require("discord.js");

const config = require('./config.json');
const tokens = require('./tokens.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.login(tokens.discord);

const notificationsRoleID = '511657769233809408'; //'derzhite' role id on v1km4n server
const serverID = '347755453528276992'; //v1km4n server id

var connection = null;
var dispatcher = null; 
var queue = [];

client.once('ready', () => {
client.user.setStatus('available')
    client.user.setPresence({
        activity: {
            name: '!helpv',
            type: "STREAMING",
            url: "https://www.twitch.tv/v1km4n"
        }
	});
});

client.on('message', async message => {	

	if (message.author.bot) return;

	if (message.content.toLowerCase().includes("блины") || message.content.toLowerCase().includes("блинов") ||
		message.content.toLowerCase().includes("блинам") || message.content.toLowerCase().includes("блинами") ||
		message.content.toLowerCase().includes("блинах") || message.content.toLowerCase().includes("blini")) {
		const catWithPancakes = new Discord.MessageAttachment("https://i.imgur.com/L4QqeEF.jpg");
		message.channel.send(catWithPancakes)
			.then(() => message.channel.send("KTO-TO SKAZAL BLINI?"));
	} 

	const withoutPrefix = message.content.slice(config.prefix.length); //"!blahblahblah" -> "blahblahblah"
	const split = withoutPrefix.split(/ +/); //"blah blah blah" -> ['blah', 'blah', 'blah']
	const command = split[0].toLowerCase(); //first 'blah' gets to be the command
	const args = split.slice(1); //and then gets removed from the list of args

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args, client, Discord);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.once("ready", ()=>{
	client.channels.cache.get("511298295985864714").send("I'm online!");
});
