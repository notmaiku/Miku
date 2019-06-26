exports.run = (client, message, args, member) => {
    const target = message.mentions.members.first();


    //Checks for non strings
    if (target != null || undefined) {
        //Checks for trash
        if (member.id == '104030302023720960') {
            message.channel.send("Sorry, you're not in my league 😒");
        } else {
            //updates
            const MongoClient = require('mongodb').MongoClient;
            const assert = require('assert');

            // Connection URL
            const url = 'mongodb://@localhost:27017/gal?authSource=$[authSource]';

            // Use connect method to connect to the server
            MongoClient.connect(url, function (err, client) {
                assert.equal(null, err);
                const db = client.db('gal')

                db.collection('users').updateOne({
                    user_id: target.id
                }, {
                        $inc: {
                            "guilds.$[guild].affection": 1
                        }
                    }
                    , {
                        arrayFilters: [{ "guild.guild_id": { $eq: message.guild.id } }]
                    }
                )
                let cursor = db.collection('users').find(
                    { user_id: target.id }
                )
                cursor.forEach((guild) => {
                    guild.guilds.forEach((id) => {
                        if (id.guild_id == message.guild.id) {
                            message.channel.send(`oWo? ${target} What's up hot suff?😏`);
                            message.channel.send(`${target} likes me this much ${id.affection}`);
                        }
                    })
                })
                client.close();
            });
        };

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