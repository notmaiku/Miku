<<<<<<< HEAD
exports.run = (client, message, args, member) => {
    const admin = require('firebase-admin');
    var FieldValue = require('firebase-admin').firestore.FieldValue;


    //references
    var db = admin.firestore();
    var currentMembers = db.collection('servers').doc(`${message.guild.id}`).collection(`members`);
    // Gets each member from guild it was called in 
    var count = message.guild.members.forEach(member => {
        // Actually deletes the field
        var removeField = currentMembers.doc(`${member.user.id}`).update({
            affection: FieldValue.delete()
        }).catch(err => {
            console.log(`The ID doesn't have the field being deleted, so "Probably a bot`)
=======
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
            // Taking aggregated result anguild.idd printing out the respected username
            try {
                db.collection('affection').updateMany(
                    { guild_id: { $eq: message.guild.id }},
                    { $set: { 'affection': 0 } }
                )
            } catch (err) {
                console.log(err);
            }
            client.close()
>>>>>>> mongo-trance
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
