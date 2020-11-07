const serverID = '347755453528276992'; //v1km4n server id

module.exports = {
    name: 'notifications',
    description: `Turning notifications on v1km4n's server on and off`,
    execute(message, args) {
        if (message.guild.id == serverID) { //if on the right server
            if (!message.member.roles.cache.some(role => role.id === notificationsRoleID)) {//if doesn't have the role yet
                message.member.roles.add(notificationsRoleID);
                message.reply("теперь ты занесён в список поддерживаемых в курсе");
            } else {
                message.member.roles.remove(notificationsRoleID);
                message.reply("ты удалён из списка поддерживаемых в курсе");
            }
        } else {
            message.reply('эта команда работает только на https://discord.gg/7xptNH4');
        }
    },
};