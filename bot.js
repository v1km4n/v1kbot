const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = '!';
const SteamAPI = require('steamapi');
const notificationsRoleID = '511657769233809408';
const steam = new SteamAPI(process.env.STEAM_TOKEN);
const ytdl = require('ytdl-core');
const ytlist = require('youtube-playlist');

var playlist_urls = [];
let player_volume = 1;

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
})

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
		message.author.send("`!citata - рандомная цитата\n!non/!noff - уведомления на сервере\n!catgirl - :(\n!chaninfo - дата создания канала (хз зачем я это сделал)\n!cbt - кокенболторчер\n!wise - локальные мемы`");
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
		var ddmmyyyy = "This channel was created on " + date + "/" + month + "/" + year + " at " + hours + ":" + minutes;
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

	/*if (command === 'volume') {
		player_volume = args[0] / 100;
		message.channel.send('Volume is now ' + args[0] + '%');
	}*/

	if (command === 'playlist') {
		await ytlist(args[0], 'url').then(res => {
			playlist_urls = res.data.playlist;
		});
		message.channel.send('parsed ' + playlist_urls.length + ' outside');
		const connection = await message.author.voice.channel.join(); 
		connection.play(ytdl(playlist_urls[0]));

		//const dispatcher = connection.play(stream);
		/*
		connection.play(ytdl(playlist_player['items'][0][url_simple]));
		const player = connection.dispatcher;
		player.setVolume(player_volume);*/
	}

	if (command === 'play') {
		const yt_url = args[0];
		const connection = await message.author.voice.channel.join(); 
		connection.play(ytdl(yt_url));
		//const player = connection.dispatcher;
		//player.setVolume(player_volume);
	}

	/*if (command === "pause") {
		player.pause();
		message.channel.send("Paused!");
	}

	if (command === "resume") {
		player.pause();
		message.channel.send("Resumed!");
	}*/
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
