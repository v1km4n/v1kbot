module.exports = {
	name: 'helpv',
	description: 'Main Bot Commands',
	execute(message, args) {
		message.author.send(`!non/!noff - уведомления на сервере
        !catgirl - :(
        !chaninfo - дата создания канала (хз зачем я это сделал)
        !cbt - кокенболторчер
        !wise - локальные мемы
        !helpm - команды музыкального бота
        !imgur + количество - рандомные картинки с имгура (!NSFW!)
        !lightshot + количество -  рандомные картинки с лайтшота
        !etf2l + ссылка на стим - инфа по последнему сезону етф2л для данного стим профиля
        !leagues + ссылка на стим - ссылки на ETF2L, UGC, RGL для данного стим профиля`);
	},
};