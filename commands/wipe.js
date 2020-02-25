exports.run = (client, message, args) => {
    const target = message.mentions.members.first();
    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');
    // Connection URL
    const url = 'mongodb://@localhost:27017/gal?authSource=$[authSource]';
    if (args != undefined) {
        // Use connect method to connect to the server
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            const db = client.db('gal')
            // This aggregates our results to join user field into affection
            let affection = db.collection('affection').aggregate([
                //Only gets affection docs with the guild id FK
                { $match: { guild_id: message.guild.id } },
                {
                    //Actual what to merge part
                    $lookup:
                    {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: 'user_id',
                        as: 'prop'
                    },
                }
            ])
            // Taking aggregated result guild.id printing out the respected username
            try {
                db.collection('affection').updateMany(
                    { guild_id: { $eq: message.guild.id }},
                    { $set: { 'affection': 0 } }
                )
            } catch (err) {
                console.log(err);
            }
            client.close()
        })
    }else{message.channel.send("Enter @Mundane or something >.>")}
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 'Moderator'
};

exports.help = {
    name: 'Resets',
    category: 'Not abuse',
    description: 'Wipes fields of all user affection prop',
    usage: 'wipe'
};
