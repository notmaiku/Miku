// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {

    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');

    // Connection URL
    const url = 'mongodb://@localhost:27017/gal?authSource=$[authSource]';

    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        const db = client.db('gal')
        // Adds server to server collection
        db.collection('servers').updateOne(
            { guild_id: `${guild.id}` },
            {
                $set: {
                    guild_id: `${guild.id}`,
                    guild_name: `${guild.name}`,
                    owner: `${guild.owner}`
                }
            },
            { upsert: true }
        )
        // Goes through each member in enmap and adds them to user collection
        guild.members.forEach((member) => {
            if (!member.user.bot) { //ignoring the bots in the server.
                db.collection('users').updateOne(
                    { user_id: `${member.id}` },
                    {
                        $set: {
                            username: `${member.user.username}`,
                            discriminator: `${member.user.discriminator}`
                        },
                        //List of guilds the user belongs to where this bot is also
                        $addToSet: {
                            guilds: {guild_id: `${guild.id}`}, 
                        },
                    },
                    { upsert: true }
                )
            }
        });
        client.close();
    });
    client.logger.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`)
};