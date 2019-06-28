// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member, guild) => {
  const MongoClient = require('mongodb').MongoClient;

  // Load the guild's settings
  const settings = client.getSettings(member.guild);
  console.log(settings)
  const assert = require('assert');

  // Connection URL
  const url = 'mongodb://@localhost:27017/gal?authSource=$[authSource]';

  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    const db = client.db('gal')
    // Goes through each member in enmap and adds them to user collection
    if (!member.user.bot) { //ignoring the bots in the server.
      db.collection('users').updateOne({
        user_id: `${member.id}`
      }, {
        $set: {
          username: `${member.user.username}`,
          discriminator: `${member.user.discriminator}`
        },
        //List of guilds the user belongs to where this bot is also
        $addToSet: {
          guilds: {
            guild_id: `${member.guild.id}`
          },
        },
      }, {
        upsert: true
      })
    };
    client.close();
  });

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  member.guild.channels.find(c => c.name === settings.welcomeChannel).send(welcomeMessage).catch(console.error);
};