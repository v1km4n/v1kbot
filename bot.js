const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = '!';

client.login(process.env.BOT_TOKEN);
client.on("message", (message) => { 
	if (message.content.toLowerCase().startsWith(prefix + 'citata'))
	{
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
	if (message.content.toLowerCase().startsWith(prefix + 'non'))
	{
		message.member.addRole("511657769233809408");
		message.reply("теперь ты занесён в список поддерживаемых в курсе. Чтобы отписаться напиши команду !noff");
	}
	if (message.content.toLowerCase().startsWith(prefix + 'noff'))
	{
		message.member.removeRole("511657769233809408");
		message.reply("ты удалён из списка поддерживаемых в курсе. Чтобы подписаться обратно напиши команду !non");
	}
	if (message.content.toLowerCase().startsWith(prefix + 'catgirl'))
	{
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
	if(message.content == "!stream")
	{
		const embed = new Discord.RichEmbed()
		.setAuthor("Векмон подрубил стрим :thinking:", "http://puu.sh/C1FAH/bd1d3574c5.png")
		.setColor(0x00AE86)
		.setThumbnail("http://puu.sh/C1G6R/ea227f5f40.png")
		.setTimestamp()
		.addField("YouTube", "http://youtube.com/c/V1KM4N/live", true)
		.addBlankField(true)
		.addField("Twitch", "https://www.twitch.tv/v1km4n", true)
		.addBlankField(true)
		 message.channel.send({embed});
	}
	if (message.content.toLowerCase().startsWith(prefix + 'wise')) 
	{
        const attachment = new Discord.Attachment('https://puu.sh/CV4mz.jpg');
        message.channel.send(attachment);
	}
	if (message.content.toLowerCase().startsWith(prefix + 'wise1')) 
	{
        const attachment = new Discord.Attachment('https://puu.sh/D2eiL.png');
        message.channel.send(attachment);
	}	
	if (message.content.toLowerCase().startsWith(prefix + 'w2g')) 
	{
	message.channel.send('https://www.watch2gether.com/rooms/pizzaroom-j1ayx7w6iq1sjgu0');
    	}
	if (message.content == '!roll')
	{
	author = message.author;
    	}	
	if (message.content.toLowerCase().startsWith(prefix + 'chaninfo'))
 	{
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
	if (message.content.toLowerCase().startsWith(prefix + 'match'))
	{
	    	if (message.author.id == "181485162486431745")
		{
		let match_message = message.toString();
		var Data = [];
		var current_data_number = 0;
		let current_data_string = '';
		match_message = match_message.substring(7);
		for (var i = 0; i < match_message.length; i++)
		{
			if (match_message[i] != " " && match_message[i] == "_")
			{
				current_data_string = current_data_string + " ";
			} 
			else if (match_message[i] != " " && match_message[i] != "_")
			{
				current_data_string = current_data_string + match_message[i];
			}
			else if (current_data_string != '')
			{
				Data[current_data_number] = current_data_string;
				current_data_string = '';
				current_data_number++;
			}
			
			if (i == match_message.length-1)
			{
				Data[current_data_number] = current_data_string;
			}
		}
		client.channels.get("614445357698514975").send("<@&614444316814737418>, " + Data[0] + " " + Data[1] + " в " + Data[2] + " МСК, карты: " + Data[3]);
		}
		else message.reply("Ты чо, это может делать только <@181485162486431745>");
		}
						     
});

client.on("ready", ()=>{
	client.channels.get("511298295985864714").send("I'm online!");
});
