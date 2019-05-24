exports.run = (client, message, args) => {
    const user = message.mentions.members.first();
    message.channel.send('What?');
    message.channel.send(user + ' is fucking gay 😷');
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "isgay",
    category: "Miscellaneous",
    description: "calls someone gay",
    usage: "isgay @[user]"
};
