const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = '!';
const SteamAPI = require('steamapi');
const notificationsRoleID = '511657769233809408';
const steam = new SteamAPI(process.env.STEAM_TOKEN);
const ytdl = require('ytdl-core');
const ytlist = require('youtube-playlist');
const fs = require('fs');

var connection = null;
var dispatcher = null; 
var queue = [];
var trigger = false;
var trigger_user = null;
var trigger_message = null;
var alias_name = null;

client.login(process.env.BOT_TOKEN);

client.once('ready', () => {
client.user.setStatus('available')
    client.user.setPresence({
        game: {
            name: '!helpv',
            type: "STREAMING",
            url: "https://www.twitch.tv/v1km4n"
        }
    });
});

// FIX STATUS RICH PRESENCE

client.on('message', async message => {	
	if (!message.content.startsWith(prefix) && (message.content.toLowerCase().includes("блины") || message.content.toLowerCase().includes("blini")) && message.author.bot == false) {
		const kot = new Discord.MessageAttachment("https://i.imgur.com/L4QqeEF.jpg");
		message.channel.send(kot)
			.then(() => message.channel.send("KTO-TO SKAZAL BLINI?"));
	}

	if (!message.content.startsWith(prefix)) return;

	const withoutPrefix = message.content.slice(prefix.length);
	const split = withoutPrefix.split(/ +/);
	const command = split[0].toLowerCase();
	const args = split.slice(1);

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
	
	if (command === 'citata') {
		answer = ["витя красавчик: превед англечане",
		"sobaque: ЗАТЫКАЛ - kill В КОНСОЛЬ",
		"Zush: Обожаю сидеть и пердеть",
		"Kworker: ну это палка на двух концах",
		"summer: йообаный чернослив, пацаны",
		"Ritz: А мы тут дегротом балуемся :smirk:",
		"WiseGenie: Здарова, мужики",
		"magistr: бля, я компот пролил, дайте паузу",
		"*DEAD* Badja : vika i really hope you do breathe'nt tonight",
		"DarkMetall: харе жрать, го мге",
		"grozer: Я этот хуй в пейнте два часа рисовал",
		"groz: мне один раз приснилось что я победил на конкурсе по громкости пердежа. Ебать я тогда охуел",
		"BlackBorada: защьб пошел нахуй",
		"gilga: say gg please",
		];
		message.channel.send(answer[Math.floor(Math.random() * answer.length)]);
	}

	if ((command === 'non') && (!message.member.roles.cache.some(role => role.id === notificationsRoleID))) {
		message.member.roles.add(notificationsRoleID);
		message.reply("теперь ты занесён в список поддерживаемых в курсе. Чтобы отписаться напиши команду !noff");
	} else if ((command === 'non') && (message.member.roles.cache.some(role => role.id === notificationsRoleID))) {
		message.reply("у тебя уже есть роль");
	}

	if ((command === 'noff') && (message.member.roles.cache.some(role => role.id === notificationsRoleID))) {
		message.member.roles.remove(notificationsRoleID);
		message.reply("ты удалён из списка поддерживаемых в курсе. Чтобы подписаться обратно напиши команду !non");
	} else if ((command === 'noff') && (!message.member.roles.cache.some(role => role.id === notificationsRoleID))) {
		message.reply("у тебя и нет никакой роли");
	}

	if (command === 'catgirl') {
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
		message.channel.send('https://www.watch2gether.com/rooms/pizzaroom-j1ayx7w6iq1sjgu0');
    }

	if (command === 'chaninfo') {
		chan = message.channel;
		datecr = chan.createdAt;
		var date = datecr.getDate();
		var month = datecr.getMonth()+1;
		var year = datecr.getYear()+1900;
		var hours = datecr.getHours();
		var minutes = datecr.getMinutes();
		var ddmmyyyy = `This channel was created on ${date}/${month}/${year} at ${hours}:${minutes}`;
		message.channel.send(ddmmyyyy);
	}

	if (command === 'match') {
		if (message.author.id == "181485162486431745") {
			let match_message = message.toString();
			var Data = [];
			var current_data_number = 0;
			let current_data_string = '';
			match_message = match_message.substring(7);
			for (var i = 0; i < match_message.length; i++) {
				if (match_message[i] != " " && match_message[i] == "_") {
					current_data_string = current_data_string + " ";
				}
				else if (match_message[i] != " " && match_message[i] != "_") {
					current_data_string = current_data_string + match_message[i];
				}
				else if (current_data_string != '') {
					Data[current_data_number] = current_data_string;
					current_data_string = '';
					current_data_number++;
				}
				if (i == match_message.length-1) {
					Data[current_data_number] = current_data_string;
				}
			}
			if (Data[4] == '') {
				client.channels.get("614445357698514975").send("<@&614444316814737418>, " + Data[0] + " " + Data[1] + " в " + Data[2] + " МСК, карта: " + Data[3]);
			} else {
				client.channels.get("614445357698514975").send("<@&614444316814737418>, " + Data[0] + " " + Data[1] + " в " + Data[2] + " МСК, карты: " + Data[3] + " + " + Data[4]);
			}
		} else message.reply("Ты чо, это может делать только <@181485162486431745>");
	};


	if (command === 'cbt') {
		pics = ["https://cdn.discordapp.com/attachments/613703369009135632/636620272451190794/P5txqHSTr1A.jpg",
					 "https://cdn.discordapp.com/attachments/613703369009135632/636618259759628288/oSdOPRKypSc.jpg",]
		const audio = new Discord.MessageAttachment('https://upload.wikimedia.org/wikipedia/commons/4/41/CocknBallTorture.ogg');
		const pic = new Discord.MessageAttachment(pics[Math.floor(Math.random() * pics.length)]);
		message.channel.send(pic)
				.then(() => message.channel.send("Cock and ball torture (CBT) is a sexual activity involving application of pain or constriction to the male genitals. This may involve directly painful activities, such as wax play, genital spanking, squeezing, ball-busting, genital flogging, urethral play, tickle torture, erotic electrostimulation or even kicking."))
				.then(() => message.channel.send(audio));
	}

	if (command === 'play') {
		if (args[0].includes('playlist')) {
			await ytlist(args[0], 'url').then(res => {
				player_queue = res.data.playlist;
			});
			for (var i = 0; i < player_queue.length; ++i) {
				await url_handler(player_queue[i], client, connection, queue);
			}
		}

		if (args[0].includes('watch')) {
			await url_handler(args[0], client, connection, queue);
		}
	}

	if (command === 'queue') {
		if (queue != [] ) {
			var local_queue = 1;
			let queue_message = `Queue:\n`;
			for (var i = 0; i < queue.length; ++i) {
				if (queue[i].channel == message.channel.id) {
					queue_message = queue_message + `${local_queue}) ${queue[i].songName} | Requested by: ${queue[i].requester}\n`;
					local_queue++;
				}
			}
			message.channel.send(`\`\`\`${queue_message}\`\`\``);
		}
	}

	if (command === 'skip') {
		var shift_amount = args[0];
		if (shift_amount === undefined) shift_amount = 1;
		var guildID = message.guild.id;
		message.channel.send(`Skipped \`${shift_amount}\` Tracks`);
		finish(client, connection, queue, guildID, shift_amount);
	}

	if (command === 'leave') {
		if (!message.member.voice.channel) message.channel.send('You are not in a Voice Channel');
		if (!message.guild.me.voice.channel) message.channel.send('The bot in not in a Voice Channel');
		if (message.member.voice.channel != message.guild.me.voice.channel) message.channel.send('The bot in in the another Voice Channel');
		if (queue) queue = [];
		message.member.voice.channel.leave();
		message.react('👋');
	}

	if (command === 'clear') {
		if (queue) queue = [];
		message.channel.send("The Player Queue was emptied!");
	}

	if (command === 'aliasgen') {
		let i = 0;
		if (args[0] === undefined) {
			message.channel.send("Usage - !aliasgen [endline] [aliasname]\n[endline] is the line which you will enter to stop");
		} else {
			message.channel.send(`Send lines one by one, ${args[0]} to stop.`);
			trigger = true;
			trigger_user = message.author;
			trigger_message = args[0];
			alias_name = args[1];
		}
	}

	if ((trigger == true) && (message.author == trigger_user)) {
		let strings = [];
		while (1) {
			strings[i] = message.content;
			if (strings[i] == trigger_message) {
				strings.pop();
				break;
			}
			i++;
		}
		let big_string = 'Full Text:\n';
		for (let i = 0; i < strings.length; ++i) {
			big_string = (`${big_string}${strings[i]}\n`);
		}
		message.channel.send(`\`\`\`${big_string}\`\`\``);
		let string = "";
		for (var a = 0; a < i-1; a++) {
			string = `${string}alias ${alias_name}${a} "say ${strings[a]}; alias ${alias_name} ${alias_name}${a+1}"\n`;
		}
		string = `${string}alias ${alias_name}${a} "say ${strings[i-1]}; alias ${alias_name} ${alias_name}0"\n`;
		string = `${string}alias ${alias_name} ${alias}${alias_names}0`;

		message.channel.send("And your alias is: ");
		message.channel.send(`\`\`\`string\`\`\``);
		
		var trigger = false;
		var trigger_user = null;
		var trigger_message = null;
		var alias_name = null;
	}

	async function url_handler(url, client, connection, queue) {
		var info = await ytdl.getInfo(url);
		var guildID = message.guild.id;

		queue.push({
			songName: info.title,
			requester: message.author.tag,
			url: url,
			channel: message.channel.id
		});

		let user_calling = message.member;
		if (!connection) connection = await user_calling.voice.channel.join(); 
		if (!dispatcher) await play(client, connection, queue, guildID)
		else {
			message.channel.send(`Added \`${info.title}\` to the Queue | Requested by \`${message.author.tag}\``);
		}
	}

	async function play(client, connection, queue, guildID) {
		client.channels.cache.get(queue[0].channel).send(`Now playing \`${queue[0].songName}\` | Requested by \`${queue[0].requester}\``);
		dispatcher = await connection.play(ytdl(queue[0].url, { filter: 'audioonly' }));
		dispatcher.guildID = guildID;

		dispatcher.once('finish', function() {
			finish(client, connection, queue, guildID, 1);
		})
	}

	function finish(client, connection, queue, guildID, shift_amount) {
		for (var i = 0; i < shift_amount; ++i){
			queue.shift();
		}

		if (queue.length > 0) {
			play(client, connection, queue, guildID);
		} else {
			let voice_channel = client.guilds.cache.get(guildID).me.voice.channel;
			if (voice_channel) voice_channel.leave();
			connection = null;
			dispatcher = null;
			message.channel.send('No More Tracks in Queue. Leaving');
		}
	}
});

/*client.on('messageDelete', message => {
	adminId = '181485162486431745';
	client.users.cache.get(adminId).send(message.author.username + "#" + message.author.discriminator + ' только что удалил сообщение\n')
	.then(() => client.users.cache.get(adminId).send('Сервер: ' + message.guild.name + '; Канал: ' + message.channel.name))
	.then(() => client.users.cache.get(adminId).send('`' + message.content + '`'));
});*/

client.once("ready", ()=>{
	client.channels.cache.get("511298295985864714").send("I'm online!");
});
