let aggregate = require('../mongo/aggregate')
exports.run = (client, message, args) => {
    aggregate(client, message.guild.id, message, 'affection')
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 'User'
};

exports.help = {
    name: 'Displays your filter',
    category: 'server',
    description: 'Will display all you filtered',
    usage: 'query'
};