var update = require('../mongo/update')
var lookup = require('../mongo/lookup')

exports.run = (client, message, args, member) => {
    const target = message.mentions.members.first();
    //Checks for non strings
    if (target != null || undefined) {
        //Checks for trash
        if (target.id == '104030302023720960') {
            message.channel.send("Sorry, you're not in my league 😒");
        } else if (target.id == '580592927680626691') {
            message.channel.send("Desperate aren't ya  😅");
        } else {
                update(client, target.id, message.guild.id, message, 'affection');
                lookup(client, target.id, message.guild.id, message, 'affection', `uWu you like me this m-much`);
            }
    } else {
        message.channel.send(`Hey! Try defining a user first 😅`);
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 'User'
}

exports.help = {
    name: 'flirt',
    category: 'Miscellaneous',
    description: 'flirts with the given user and tracks crush lvl',
    usage: 'flirt @[user]'
}
