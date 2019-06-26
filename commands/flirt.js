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

                var memberData = db.collection('affection').updateOne({
                    user_id: `${target.id}`
                }, {
                    $set: {
                        guild: {
                            'guild_id.$[element]': message.guild.id,
                            affection: 0
                        }
                    },
                    $inc:{
                            'guild.affection': 1
                    }
                }, {
                    upsert: true,
                    multi: true,
                    arrayFilters: [{"element": message.guild.id}]
                })
                let likes = db.collection('users').find({
                    user_id: `${target.id}`,
                    guild: {
                        guild_id: `${message.guild.id}`
                    }
                })
                message.channel.send(`oWo? ${target} What's up hot suff?😏`);
                message.channel.send(`${target} likes me this much ${likes}`);
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