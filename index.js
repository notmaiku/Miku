// require the discord.js module
const { Client, RichEmbed } = require('discord.js');

// create a new Discord client
const client = new Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.on('ready', () => {
	console.log('Ready!');
});

const prefix = '?';

client.on('message', message => {
	//Preventing bot-ception
	if (!message.content.startsWith(prefix) || message.author.bot)
		return;

	const user = message.mentions.users.first();
	if (!message.guild) return;
	if (message.content === '<@!162320756489977856>') {
		message.channel.send('Maiku is not available.');
		message.channel.send('However you can talk to his rep Ajuk');
	} else if (message.content === prefix + 'avt') {
		message.channel.send(message.author.avatarURL);
	} else if (message.content === prefix + 'id') {
		message.channel.send('Msg ID: ' + message.content);
	} else if (message.content.startsWith(prefix + 'gay')) {
		if (user) {
			message.channel.send('What?');
			message.channel.send(user + ' is fucking gay 😷');
		} else {
			return message.channel.send(prefix + 'embed');
		}
	} else if (message.content === prefix + 'embed') {
		const embed = new RichEmbed()
			// Set the title of the field
			.setTitle('Tyler')
			// Set the color of the embed
			.setColor(0xead1dc)
			// Set the main content of the embed
			.setDescription('Likes Shelbly a little too much');
		// Send the embed to the same channel as the message
		message.channel.send(embed);
	}else if(message.content.startsWith( prefix +'getid')) {
		message.channel.send(user.equals(message.author))
	} else if (message.content.startsWith(prefix + 'kick')) {
		// Assuming we mention someone in the message, this will return the user
		// Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
		const user = message.mentions.users.first();
		// If we have a user mentioned
		if (user === '<@!162320756489977856>') {
			// Now we get the member from the user
			const member = message.guild.member(user);
			// If the member is in the guild
			if (member) {
				/**
				 * Kick the member
				 * Make sure you run this on a member, not a user!
				 * There are big differences between a user and a member
				 */
				member
					.kick('Optional reason that will display in the audit logs')
					.then(() => {
						// We let the message author know we were able to kick the person
						message.reply(`Successfully kicked ${user.tag}`);
					})
					.catch(err => {
						// An error happened
						// This is generally due to the bot not being able to kick the member,
						// either due to missing permissions or role hierarchy
						message.reply('I was unable to kick the member');
						// Log the error
						console.error(err);
					});
			} else {
				// The mentioned user isn't in this guild
				message.reply("That user isn't in this guild!");
			}
			// Otherwise, if no user was mentioned
		} else {
			message.reply("You didn't mention the user to kick!");
		}
	}
});

// login to Discord with your app's token
client.login('NTgwNTkyOTI3NjgwNjI2Njkx.XOS9wg.WGzvtaebZX5u4OZ_8FdncWHZtB0');
