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
	if(message.content == "!derzhi"){
	let role = message.guild.roles.find(r => r.name === "derzhite");
	
	let member = message.mentions.members.first();
	
	member.addRole(role).catch(console.error);
	message.channel.send("success");
	}
});
client.on("ready", ()=>{
	client.channels.get("511298295985864714").send("I'm online!");
});
