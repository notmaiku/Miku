// require the discord.js module
const { Client, RichEmbed } = require('discord.js');

// create a new Discord client
const client = new Client();

//require the config file
const config = require("./config.json");

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.on('ready', () => {
	console.log('Ready!');
});

const prefix = config.prefix;

client.on('message', message => {
	//Preventing bot-ception
	if (!message.content.startsWith(prefix) || message.author.bot)
		return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	//for bot-dev only commands use:
	// if(message.author.id !== config.ownerID)
	//     return;
	// else
	//     code here.

	const user = message.mentions.users.first();
	if(!message.guild) return;
	if(message.content === '<@!162320756489977856>') {
		message.channel.send('Maiku is not available.');
		message.channel.send('However you can talk to his rep Ajuk');
	}
	 else if(command === 'avt') {
		message.channel.send(message.author.avatarURL);
	} else if(command === 'id') {
		message.channel.send('Msg ID: ' + message.content);
	} else if(command === 'gay') {
		if(user) {
			message.channel.send('What?');
			message.channel.send(user + ' is fucking gay 😷');
		} else {
			return message.channel.send(prefix + 'embed');
		}
	} else if(command === 'embed') {
		const embed = new RichEmbed()
			// Set the title of the field
			.setTitle('Tyler')
			// Set the color of the embed
			.setColor(0xead1dc)
			// Set the main content of the embed
			.setDescription('Likes Shelbly a little too much');
		// Send the embed to the same channel as the message
		message.channel.send(embed);
	}else if(command === 'getid') {
		message.channel.send(user.equals(message.author))
	} else if(command ===  'kick') {
		// Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
		let member = message.mentions.members.first();
	 	let reason = args.slice(1).join(" ");

	 	//sending the kicked user a kick message
		var kickMessage = "You have been kicked from "+message.guild.name+" for the reason: "+reason

		member.send(kickMessage)
			.catch(err => {
				message.reply("Cannot send messages to this user.");
			});


		// If the member is in the guild
		if (member) {
			member.kick(reason)
				.then(() => {

					// We let the message author know we were able to kick the person
					if(reason === null)
						message.reply(`Successfully kicked ${user.tag} for reason: none`);
					else
						message.reply(`Successfully kicked ${user.tag} for reason: ` + reason);

					//Sends the previous member a DM for why they were kicked.
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
			// Invalid user mentioned.
			message.reply("Please specify a valid member to kick.");
		}

	} else if (command === "asl") { //Command with arguments example.
		let [age, sex, location] = args;
		message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`);
	}
	 else if (command === "dm") {
		let member = message.mentions.members.first();
		let dm = args.slice(1).join(" ");

		member.send(dm)
			.catch(err => {
				message.reply("Cannot send messages to this user.");
			});
	}
});

// login to Discord with your app's token
client.login(config.token);
