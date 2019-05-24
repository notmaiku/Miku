exports.run = (client, message, args) => {
    const target = message.mentions.members.first();
    message.channel.send(
            `HEY! ${target} want sum fuk?`
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