exports.run = (client, message, args) => {
    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');

    // Connection URL
    const url = 'mongodb://@localhost:27017/gal?authSource=$[authSource]';

    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db('gal')
        // This aggregates our results to join user field into affection
        let affection = db.collection('affection').aggregate([
            //Only gets affectoin docs with the guild id FK
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
        // Taking aggregated result and printing out the respected username
        affection.forEach((user) => {
            console.log(user.prop)
            //I build the msg to user, but not whole msg uWu
            let msg = 'Affection is '
            msg += user.affection +' for '
            user.prop.forEach((user) => {
                message.channel.send( msg + user.username)})
        })
        client.close()
    })
};

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
