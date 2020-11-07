const tokens = require('./tokens.json');

const SteamAPI = require('steamapi');
const steam = new SteamAPI(tokens.steam);

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
	name: 'leagues',
	description: 'TF2 League Checker',
	execute(message, args, client, Discord) {
        var request = new XMLHttpRequest();
		var UGCLink;
		var RGLLink;
		var ETF2LLink;

		let NickName = null;
		let ProfilePicture = null;

		steam.resolve(args[0]).then(steamID => {			
			// UGC
			UGCLink = "https://www.ugcleague.com/players_page.cfm?player_id=" + steamID;

			// RGL
			RGLLink = "https://rgl.gg/Public/PlayerProfile.aspx?p=" + steamID;

			//ETF2L


			let etf2lPlayerURL = new URL("https://api.etf2l.org/player/") + steamID + (".json");
			request.open('GET', etf2lPlayerURL, false);
			request.send();

			let etf2lPlayer = JSON.parse(request.responseText);

			if (etf2lPlayer.status.code == 200) { //if given steamid has an ETF2L profile, parse data from there
				let ETF2LID = etf2lPlayer.player.id;
				NickName = etf2lPlayer.player.name;
				ProfilePicture = etf2lPlayer.player.steam.avatar;
				ETF2LLink = "https://etf2l.org/forum/user/" + ETF2LID;
				var embedWithLeaguesLinks = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`League Links for **${NickName}**`)
				.setThumbnail(ProfilePicture)
				.addFields(
					{ name: '**ETF2L**', value: ETF2LLink},
					{ name: '**UGC**', value: UGCLink},
					{ name: '**RGL**', value: RGLLink},
				)
				message.channel.send(embedWithLeaguesLinks);
			} else { //if not, take the nickname and the profile picture from the steam profile
				console.log("got not 200");
				steam.getUserSummary(steamID).then(summary => { //I HATE RESOLVES SO MUCH THANKS TO THEM I HAVE TO BUILD THE SAME EMBED TWICE 
					NickName = summary.nickname;
					ProfilePicture = summary.avatar.large;
					ETF2LLink = "none";
					var embedWithLeaguesLinks = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle(`League Links for **${NickName}**`)
					.setThumbnail(ProfilePicture)
					.addFields(
					{ name: '**ETF2L**', value: ETF2LLink},
					{ name: '**UGC**', value: UGCLink},
					{ name: '**RGL**', value: RGLLink},
					)
					message.channel.send(embedWithLeaguesLinks);
				});	
			}
		});
	},
};