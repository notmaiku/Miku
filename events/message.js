module.exports = (client, message) => {
	// Ignore all bots
	if (message.author.bot) return;

	// Grab the settings for this server from Enmap.
	// If there is no guild, get default conf (DMs)
	const settings = message.settings = client.getSettings(message.guild);

	// Ignore messages not starting with the prefix (in config file)
	if (message.content.indexOf(settings.prefix) !== 0) return;

	// Our standard argument/command name definition.
	const args = message.content
		.slice(settings.prefix.length)
		.trim()
		.split(/ +/g);
	const command = args.shift().toLowerCase();

	// Grab the command data from the client.commands Enmap
	const cmd = client.commands.get(command);

	// If that command doesn't exist, silently exit and do nothing
	if (!cmd) return;
	// To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
	// The "level" command module argument will be deprecated in the future.

	const level = client.permlevel(message);

	if (level < client.levelCache[cmd.conf.permLevel]) {
		if (settings.systemNotice === "true") {
			return message.channel.send(`You do not have permission to use this command.
  Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
  This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
		} else {
			return message.channel.send("ur mom gay");
		}
	}

	message.author.permLevel = level;

	// Run the command
	cmd.run(client, message, args, level);
};
