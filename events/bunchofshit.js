// const prefix = config.prefix;
// client.on('message', message => {
// 	//Preventing bot-ception
// 	if (!message.content.startsWith(prefix) || message.author.bot) return;

// 	const args = message.content
// 		.slice(prefix.length)
// 		.trim()
// 		.split(/ +/g);
// 	const command = args.shift().toLowerCase();

// 	//for bot-dev only commands use:
// 	// if(message.author.id !== config.ownerID)
// 	//     return;
// 	// else
// 	//     code here.

// 	const user = message.mentions.users.first();
// 	if (!message.guild) return;
// 	if (message.content === '<@!162320756489977856>') {
// 		message.channel.send('Maiku is not available.');
// 		message.channel.send('However you can talk to his rep Ajuk');
// 	} else if (command === 'avt') {
// 		message.channel.send(message.author.avatarURL);
// 	} else if (command === 'id') {
// 		message.channel.send('Msg ID: ' + message.content);
// 	} else if (command === 'gay') {
// 		if (user) {
// 			message.channel.send('What?');
// 			message.channel.send(user + ' is fucking gay 😷');
// 		} else {
// 			return message.channel.send(prefix + 'embed');
// 		}
// 	} else if (command === 'embed') {
// 		const embed = new RichEmbed()
// 			// Set the title of the field
// 			.setTitle('Tyler')
// 			// Set the color of the embed
// 			.setColor(0xead1dc)
// 			// Set the main content of the embed
// 			.setDescription('Likes Shelbly a little too much');
// 		// Send the embed to the same channel as the message
// 		message.channel.send(embed);
// 	} else if (command === 'getid') {
// 		message.channel.send(user.equals(message.author));
	
// 	} else if (command === 'asl') {
// 		//Command with arguments example.
//         let [age, sex, location] = args;
//         console.log(args)
// 		message.reply(
// 			`Hello ${
// 				message.author.username
// 			}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`
// 		);
// 	} else if (command === 'dm') {
// 		let member = message.mentions.members.first();
// 		let dm = args.slice(1).join(' ');

// 		member.send(dm).catch(err => {
// 			message.reply('Cannot send messages to this user.');
// 		});
// 	}
// });
