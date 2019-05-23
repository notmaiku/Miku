export function run(client, message, [mention, reason]) {
	// Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
	let member = message.mentions.members.first();
	let reason = args.slice(1).join(' ');

	//sending the kicked user a kick message
	var kickMessage =
		'You have been kicked from ' +
		message.guild.name +
		' for the reason: ' +
		reason;

	member.send(kickMessage).catch(err => {
		message.reply('Cannot send messages to this user.');
	});

	// If the member is in the guild
	if (member) {
		member
			.kick(reason)
			.then(() => {
				// We let the message author know we were able to kick the person
				if (reason === null)
					message.reply(`Successfully kicked ${user.tag} for reason: none`);
				else
					message.reply(
						`Successfully kicked ${user.tag} for reason: ` + reason
					);

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
		message.reply('Please specify a valid member to kick.');
	}
}
