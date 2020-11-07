module.exports = {
    name: 'w2g',
    description: '',
    execute(message, args) {
        if (message.author.id == '181485162486431745') { // if v1km4n
            message.channel.send('https://www.watch2gether.com/rooms/pizzaroom-j1ayx7w6iq1sjgu0');
        } else {
            message.channel.send('You are not allowed to use that command'); //if not
        }
    },
};