module.exports = {
    name: 'lightshot',
    description: 'Lightshot Picture Stalking',
    execute(message, args) {
        const port = '8099'; //port for Kworker's apiserver
        var received = '0'; //amount of messsages recived 	
        var socket = require('net').Socket();
        socket.connect(port, '45.128.206.232'); //kworker\'s API ip
        socket.write("lightshot " + args[0] + "\n"); //sending request to kworker\'s api
        socket.on('data', function (data) {  //receiving  messages from Kworker's api
            message.channel.send(data.toString());
        received++;	
        if (received >= args[0]) socket.destroy();
        });
    },
};