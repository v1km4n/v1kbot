var dmblDates = {
    'Stars': Date.UTC(2020, 12, 19),
    'Zush': Date.UTC(2021, 6, 6),
    'Shomav': Date.UTC(2021, 6, 18),
    'pivo': Date.UTC(2020, 2, 2),
};


module.exports = {
    name: 'dmbl',
    description: '',
    execute(message, args) {
        mujikName = args[0][0].toUpperCase() + args[0].slice(1); //sASdfnkSDnk -> sasdfnksdnk -> Sasdfnksdnk
        if (mujikName in dmblDates) {
            if (dmblDates[mujikName] < Date.now()) {
                message.channel.send(`${mujikName} уже отслужил, мужик`);
            } else {
                time = dmblDates[mujikName] - Date.now();
                let milliseconds = time % 1000; //seconds
                time = (time - milliseconds) / 1000; //milliseconds -> seconds 
                let seconds = time % 60; //minutes
                time = (time - seconds) / 60; //seconds -> minutes 
                let minutes = time % 60; //hours
                time = (time - minutes) / 60; //minutes -> hours
                let hours = time % 24; //days
                time = (time - hours) / 24; //hours -> days
                let days = time % 31; //months
                time = (time - days) / 31 //days -> months
                if (time == 0) message.channel.send(`${mujikName} вернётся через ${days} дней`)
                else if (days == 0) message.channel.send(`${mujikName} вернётся через ${time} месяцев`)
                else message.channel.send(`${mujikName} вернётся через ${time} месяцев и ${days} дней`);
            }
        } else if (args[0] === undefined) {
            let list = `Current list of mujiki:\`\`\`\n`;
            for (mujik in dmblDates) {
                list += `${mujik}\n`;
            }
            list += `\`\`\``;
            message.channel.send(list);
        } else {
            message.channel.send('No such mujik');
        }
    },
};