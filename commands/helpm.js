module.exports = {
        name: 'helpm',
        description: 'Music Bot Commands',
        execute(message, args) {
                message.author.send(`!play [youtube_url] - проигрывание музла с YT (можно формировать очередь)\n
                !queue - непосредственно очередь\n
                !skip [x] - пропустить x треков (просто !skip пропустит один)\n
                !leave - выгнать бота из войса (или он выйдет сам, когда кончится очередь)`);
        },
};