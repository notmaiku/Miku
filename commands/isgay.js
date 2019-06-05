exports.run = (client, message, args) => {
    var user = message.mentions.members.first();
    try {
        if (user.id != '580592927680626691') {
            message.channel.send('What?');
            message.channel.send(user + ' is fucking gay 😷');
        } else {
            if (message.author.id == '104030302023720960') {
                message.channel.send("Awww, someone is desperate? 😂")
            } else {
                message.channel.send("Use a person D:<")
            }
        }
    } catch (error) {
        message.channel.send("Use a person D:<")
    }

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
