exports.run = (client, message, args, member) => {
    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');

    // Connection URL
    const url = 'mongodb://@localhost:27017/gal?authSource=$[authSource]';

    // Use connect method to connect to the server
    MongoClient.connect(url, (err, client) => {
        assert.equal(null, err);
        const db = client.db('gal')
        // This aggregates our results to join user field into affection
        let affection = db.collection('affection').aggregate([
            //Only gets affectoin docs with the guild id FK
            { $match: { guild_id: message.guild.id, user_id: message.author.id }, },
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
        //Through aggregated result it prints out msg author username and attribute
        affection.forEach((user) => {
            let msg = user.affection
            user.prop.forEach((user)=>{message.channel.send('Affection ' + msg +' 👀 Look at this guy'+user.username)})
        })
        client.close()
    })
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "displays stats",
    category: "server",
    description: "Will display someone's stats",
    usage: "dstats"
};
