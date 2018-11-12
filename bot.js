const Discord = require("discord.js");
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);
client.on("message", (message) => { 
	if(message.content == "!webmub_kogda_vidos"){ 
	message.reply("<:webmube_king:378905849864912896>");
	} 
	if(message.content == "!citata"){
	answer = ["витя красавчик: превед англечане", "sobaque: ЗАТЫКАЛ - kill В КОНСОЛЬ", 
	"Zush: Обожаю сидеть и пердеть", "Kworker: ну это палка на двух концах", "summer: йообаный чернослив, пацаны", "Ritz: А мы тут дегротом балуемся :smirk:",
	 "vika: хотел как анимешная девочка чихнуть, а получилась какая-то хуйня",]; //Массив с возможными ответами
	message.channel.send(answer[Math.floor(Math.random() * answer.length)]);
	}
	if(message.content == "!wise"{
	message.channel.send("http://puu.sh/C0KWv/752fdc8f1a.PNG");
	}
	if(message.content == "!non"){
	message.member.addRole("511657769233809408");
	message.reply("теперь ты занесён в список поддерживаемых в курсе. Чтобы отписаться напиши команду !noff");
	}
	if(message.content == "!noff"){
	message.member.removeRole("511657769233809408");
	message.reply("ты удалён из списка поддерживаемых в курсе. Чтобы подписаться обратно напиши команду !non");
	}	
});
client.on("ready", ()=>{
	client.channels.get("511298295985864714").send("I'm online!");
});
