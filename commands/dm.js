exports.run = (client, message, args) => {
let member = message.mentions.members.first();
		let dm = args.slice(1).join(" ");
		member.send(dm)
			.catch(err => {
				message.reply("Cannot send messages to this user.");
            });
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "Moderator"
};

exports.help = {
	name: "dm",
	category: "Communication",
	description: "dm's the given user",
	usage: "dm @[user] [message]"
};
