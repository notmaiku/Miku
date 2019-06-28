exports.run = (client, message) => {

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
            { guild_id: `${message.guild.id}` },
            {
                $set: {
                    guild_id: `${message.guild.id}`,
                    guild_name: `${message.guild.name}`,
                    owner: `${message.guild.owner}`
                }
            },
            { upsert: true }
        )
        // Goes through each member in enmap and adds them to user collection
        message.guild.members.forEach((member) => {
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
                            guilds: {guild_id: `${message.guild.id}`}, 
                        },
                    },
                    { upsert: true }
                )
            }
        });
        client.close();
    });
    client.logger.cmd(`[GUILD UPADTED] ${message.guild.name} (${message.guild.id}) added the bot. Owner: ${message.guild.owner.user.tag} (${message.guild.owner.user.id})`)
    message.channel.send('Guild updated 😁')
}


exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "Moderator"
};

exports.help = {
	name: "update guild",
	category: "Management",
	description: "Updates guild members in the guid msg was sent",
	usage: "upguild"
};