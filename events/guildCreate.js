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
        console.log("Connected successfully to server " + db);
        console.log(db.collection('servers').find({'id': `${guild.id}`}))
        if (db.collection('servers').find({id: `${guild.id}`}) == 0 || undefined) {
            db.collection('servers').doc(`${guild.id}`).insertOne({
                    id: `${guild.id}`,
                    name: `${guild.name}`,
                    owner: `${guild.owner}`
                })
                .then((result) => {
                    console.log(result)
                })
        }
        guild.members.forEach((member) => {
            if (!member.user.bot &&  member.id != db.collection('members').find({member_id: `${member.id}`})) { //ignoring the bots in the server.
                db.collection('members').insertOne({
                    id: `${member.id}`,
                    username: `${member.user.username}`,
                    discriminator: `${member.user.discriminator}`,
                })
            }
        });
        client.close();
    });
    client.logger.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`)
};