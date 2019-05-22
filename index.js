// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
if (message.content === 'No one:') {
	// send back "Pong." to the channel the message was sent in
	message.channel.send('Tyler: Shebly');
}
});




// login to Discord with your app's token
client.login('NTgwNTkyOTI3NjgwNjI2Njkx.XOS9wg.WGzvtaebZX5u4OZ_8FdncWHZtB0');
