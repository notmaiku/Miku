// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {

    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');

    // Connection URL
    const url = 'mongodb://@localhost:27017/gal?authSource=$[authSource]';

    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server " + client.db('gal'));
        const db = client.db('gal')
        db.collection('servers').insertOne({
            id: `${guild.id}`,
            name: `${guild.name}`,
            owner: `${guild.owner}`
        })
        .then((result)=>{
            console.log(result)
        })
        const cursor = db.collection('inventory').find({ name: 'test' })
        // guild.members.forEach((member) => {
        //     if (!member.user.bot) { //ignoring the bots in the server.
        //         // var currentMember = db.collection('servers').doc(`${guild.id}`).collection(`members`).doc(`${member.id}`);
        //         // var memberData = {
        //         //     id: `${member.id}`,
        //         //     username: `${member.user.username}`,
        //         //     discriminator: `${member.user.discriminator}`,
        //         // };
        //         db.servers.${ guild.id }.set({
        //             id: `${member.id}`,
        //             username: `${member.user.username}`,
        //             discriminator: `${member.user.discriminator}`,
        //         })
        //         // currentMember.set(memberData)
        //     }
        // });
        client.close();
    });
        client.logger.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`)
        // //adding each user as a document to the users collection within the server
};