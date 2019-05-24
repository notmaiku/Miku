exports.run = (client, message, args) => {
    const target = message.mentions.members.first();
    message.channel.send(
            `Ara ara~ ${target} are you getting short on money mister?`
    );
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "flirt",
    category: "Miscellaneous",
    description: "flirts with the given user",
    usage: "flirt @[user]"
};