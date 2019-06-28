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
            //Mongo imports
            let url = 'mongodb://mongodb0.localhost:27017/gal'
            const MongoClient = require('mongodb').MongoClient;
            const assert = require('assert');
            //Connect to Mongo func
            MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
                assert.equal(null, err);
                const db = client.db('gal')
                //Increments user's property in affection collection or births
                db.collection('affection').updateOne({
                    user_id: target.id, guild_id: message.guild.id
                }, {
                        $inc: {
                            affection: 1
                        }
                    },
                    { upsert: true }
                )
                //Querying for user's affection
                let cursor = db.collection('affection').find(
                    { user_id: target.id, guild_id: message.guild.id }
                )
                //I don't know why I have to do forEach but this it to access to cursor
                cursor.forEach(prop => {
                    message.channel.send(`uWu you like me this m-much ${prop.affection}!`)
                })
                client.close();
            })
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
