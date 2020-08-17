const Discord = require("discord.js"); //main discord js api
const SteamAPI = require('steamapi'); //steam api for etf2l search
const ytdl = require('ytdl-core'); //ytmusic support
const ytlist = require('youtube-playlist'); //playlist for ytmusic support
const config = require('./config.json');

const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);
const steam = new SteamAPI(process.env.STEAM_TOKEN);

const notificationsRoleID = '511657769233809408'; //'derzhite' role id on v1km4n server
const serverID = '347755453528276992'; //v1km4n server id

var connection = null;
var dispatcher = null; 
var queue = [];

const stars = new Date(Date.UTC(2020, 11, 18, 0, 0, 0));


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

	if (!message.content.startsWith(config.prefix) && (message.content.toLowerCase().includes("блины")   ||
							   message.content.toLowerCase().includes("блинов")  ||
							   message.content.toLowerCase().includes("блинам")  ||
							   message.content.toLowerCase().includes("блинами") ||
							   message.content.toLowerCase().includes("блинах")  ||
							   message.content.toLowerCase().includes("blini"))&&
	                                                   message.author.bot == false) {
		const catWithPancakes = new Discord.MessageAttachment("https://i.imgur.com/L4QqeEF.jpg");
		message.channel.send(catWithPancakes)
			.then(() => message.channel.send("KTO-TO SKAZAL BLINI?"));
	} //KTO-TO SKAZAL BLINI? reaction

	const withoutPrefix = message.content.slice(config.prefix.length); //"!blahblahblah" -> "blahblahblah"
	const split = withoutPrefix.split(/ +/); //"blah blah blah" -> ['blah', 'blah', 'blah']
	const command = split[0].toLowerCase(); //first 'blah' gets to be the command
	const args = split.slice(1); //and then is removed from the list of args

	if (command === 'helpv') {
		message.author.send("`!citata - рандомная цитата\n!non/!noff - уведомления на сервере\n!catgirl - :(\n!chaninfo - дата создания канала (хз зачем я это сделал)\n!cbt - кокенболторчер\n!wise - локальные мемы\n!helpm - команды музыкального бота`");
	}

	if (command === 'helpm') {
		message.author.send("`!play [youtube_url] - проигрывание музла с YT (можно формировать очередь)\n!queue - непосредственно очередь\n!skip [x] - пропустить x треков (просто !skip пропустит 1)\n!leave - выгнать бота из войса (или он выйдет сам, когда кончится очередь)`");
	}
	
	if (command === 'etf2l') {
		for (let counter = 0; counter < args.length; counter++){	
			steam.resolve(args[counter]).then(id => {
				message.channel.send('http://etf2l.org/search/' + id);
			});
		}
	}

	if (command === 'non') {
		if (message.server.id == serverID) { //if on the right server
			if (!message.member.roles.cache.some(role => role.id === notificationsRoleID)) {//if doesn't have the role yet
				message.member.roles.add(notificationsRoleID);
				message.reply("теперь ты занесён в список поддерживаемых в курсе. Чтобы отписаться напиши команду !noff");
			} else {
				message.reply("у тебя уже есть роль");
			}
		} else {
			message.reply('эта команда работает только на https://discord.gg/7xptNH4');
		}
	}

	if (command === 'noff') {
		if (message.server.id == serverID) { //if on the right server
			if (!message.member.roles.cache.some(role => role.id === notificationsRoleID)) {//if has the role already
				message.member.roles.remove(notificationsRoleID);
				message.reply("ты удалён из списка поддерживаемых в курсе. Чтобы подписаться обратно напиши команду !non");
			} else {
				message.reply("у тебя и нет никакой роли");
			}
		} else {
			message.reply('эта команда работает только на https://discord.gg/7xptNH4');
		}
	}

	if (command === 'catgirl') { //ah good ol' weaboo days
		answer = ["кошко-девочек ещё не изобрели ;_;",
		"в этом мире всё ещё нет смысла жить - кошко-девочек не существует",
		"кошко-девочек пока нет, придётся перепроходить некопару",
		"кошко-девочек нет, но вы держитесь",
		"кошко-девочек ещё не изобрели, но пытаться заставить реальную девушку отыгрывать кошко-девочку незаконно",
		"нет, всё ещё не изобрели. На, не грусти: https://bit.ly/2BMGpNn",
		"не-а, нету кошко-девочек. Да и вообще, как ты себе это представляешь?",
		"у тебя не найдётся сотки на верёвку и мыло? Кошко-девочек ещё не изобрели",
		"некопара поселила в тебя ложную надежду, которая никогда не оправдается. Живи с этим.",
		];
		message.reply(answer[Math.floor(Math.random() * answer.length)]);
	}

	if (command === 'wise') {
		const attachment = new Discord.MessageAttachment('https://i.imgur.com/pLRMvCr.jpg');
		message.channel.send(attachment);
	}
	
	if (command === 'damn') {
		const attachment = new Discord.MessageAttachment('https://cdn.discordapp.com/attachments/347767925241020426/677908852233994250/0_Ji8-YET7M.png');
		message.channel.send(attachment);
	}

	if (command === 'w2g') {
		if (message.author.id == '181485162486431745') { // if v1km4n
			message.channel.send('https://www.watch2gether.com/rooms/pizzaroom-j1ayx7w6iq1sjgu0');
		} else {
			message.channel.send('You are not allowed to use that command'); //if not
		}
    }

	if (command === 'channel') {
		creationDate = message.channel.createdAt;
		let date = creationDate.getDate();
		let month = creationDate.getMonth()+1;
		let year = creationDate.getYear()+1900;
		let hours = creationDate.getHours();
		let minutes = creationDate.getMinutes();
		message.channel.send(`This channel was created on ${date}/${month}/${year} at ${hours}:${minutes}`);
	}

	if (command === 'dmbl') {
		if (args[0].toLowerCase() === 'stars') {
			ms_to_date(stars);
		} else if (args[0] === undefined) {
			message.channel.send('```Current list of mujiki:\nStars```')
		} else {
			message.channel.send('No such mujik');
		}
	}

	function ms_to_date (givenDate) {
		ms = givenDate - Date.now();
		var mss = ms % 1000;
		ms = (ms - mss) / 1000; //secs
		var secs = ms % 60;
		ms = (ms - secs) / 60; //mins
		var mins = ms % 60;
		ms = (ms - mins) / 60; //hrs
		var hrs = ms % 24;
		ms = (ms - hrs) / 24; // days
		message.channel.send(`${ms} days, ${hrs} hrs, ${mins} mins, ${secs} secs`);
	}

	if (command === 'cbt') {
		cbtPics = ["https://cdn.discordapp.com/attachments/613703369009135632/636620272451190794/P5txqHSTr1A.jpg",
					 "https://cdn.discordapp.com/attachments/613703369009135632/636618259759628288/oSdOPRKypSc.jpg",]
		const audio = new Discord.MessageAttachment('https://upload.wikimedia.org/wikipedia/commons/4/41/CocknBallTorture.ogg');
		const pic = new Discord.MessageAttachment(cbtPics[Math.floor(Math.random() * cbtPics.length)]);
		message.channel.send(pic)
				.then(() => message.channel.send("Cock and ball torture (CBT) is a sexual activity involving application of pain or constriction to the male genitals. This may involve directly painful activities, such as wax play, genital spanking, squeezing, ball-busting, genital flogging, urethral play, tickle torture, erotic electrostimulation or even kicking."))
				.then(() => message.channel.send(audio));
	}

	if (command === 'play') {
		if (args[0] === undefined) {
			message.channel.send('Please provide a URL');
		} else {
			if (args[0].includes('playlist')) { //if playlist
				await ytlist(args[0], 'url').then(res => {
					player_queue = res.data.playlist; //list of videos within given playlist
				});
				for (let i = 0; i < player_queue.length; ++i) {
					await url_handler(player_queue[i], client, connection, queue); //handle all the urls from given playlist
				}
			}

			if (args[0].includes('watch')) { //if video
				await url_handler(args[0], client, connection, queue);
			}
		}

		message.delete(); //deletes the initial message (because of a huge yt video preview)
	}

	if (command === 'queue') {
		if (queue != [] ) { //if not empty
			let queueMessage = `Queue:\n`;
			for (let i = 0; i < queue.length; ++i) {
				queueMessage = `${queueMessage}${(i+1)}) ${queue[i].songName} | Requested by: ${queue[i].requester}\n`;
			}
			message.channel.send(`\`\`\`${queueMessage}\`\`\``);
		} else {
			message.channel.send("Queue is empty");
		};
	}

	if (command === 'skip') {
		let shiftAmount = args[0]; //how much tracks would we want to skip
		if (shiftAmount === undefined) shiftAmount = 1; //1 if not given any number
		let guildID = message.guild.id;
		message.channel.send(`Skipped \`${shiftAmount}\` Tracks`);
		finish(client, connection, queue, guildID, shiftAmount);
	}

	if (command === 'leave') {
		if (!message.member.voice.channel) message.channel.send('You are not in a Voice Channel');
		if (!message.guild.me.voice.channel) message.channel.send('The bot in not in a Voice Channel');
		if (message.member.voice.channel != message.guild.me.voice.channel) message.channel.send('The bot in in the another Voice Channel');
		if (queue) queue = []; //cleans the queue
		message.member.voice.channel.leave();
		message.react('👋');
	}

	if (command === 'clear') {
		if (queue) queue = [];
		message.channel.send("The Player Queue was emptied!");
	}

	async function url_handler(url, client, connection, queue) {
		let info = await ytdl.getInfo(url);
		let guildID = message.guild.id;

		queue.push({
			songName: info.title,
			requester: message.author.tag,
			url: url,
			channel: message.channel.id
		});

		if (!connection) connection = await message.member.voice.channel.join(); //connection becomes null again as soon as the bot joins the channel, so every time we play smth we have to make a new one
		if (!dispatcher) await play(client, connection, queue, guildID) //play if no other song is playing rn
		else {
			message.channel.send(`Added \`${info.title}\` to the Queue | Requested by \`${message.author.tag}\``); //otherwise add to the queue
		}
	}

	async function play(client, connection, queue, guildID) {
		client.channels.cache.get(queue[0].channel).send(`Now playing \`${queue[0].songName}\` | Requested by \`${queue[0].requester}\``);
		if (!connection) connection = await message.member.voice.channel.join(); 
		dispatcher = await connection.play(ytdl(queue[0].url, { filter: 'audioonly', type: 'opus' })); //audioonly hopefully will lag less
		dispatcher.guildID = guildID;

		dispatcher.once('finish', function() {
			finish(client, connection, queue, guildID, 1);
		})
	}

	async function finish(client, connection, queue, guildID, shiftAmount) {
		for (let i = 0; i < shiftAmount; ++i){
			queue.shift();
		}

		if (queue.length > 0) {
			play(client, connection, queue, guildID);
		} else {
			console.log('queue is empty, exiting');
			let voice_channel = client.guilds.cache.get(guildID).me.voice.channel;
			if (voice_channel) voice_channel.leave();
			connection = null;
			dispatcher = null;
			queue = [];
			message.channel.send('No More Tracks in Queue. Leaving');
		}
	}
});

client.once("ready", ()=>{
	client.channels.cache.get("511298295985864714").send("I'm online!");
});
