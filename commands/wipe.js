exports.run = (client, message, guild, member) => {
    const admin = require('firebase-admin');
    var FieldValue = require('firebase-admin').firestore.FieldValue;

    //references
    var db = admin.firestore();
    var currentMembers = db.collection('servers').doc(`${message.guild.id}`).collection(`members`);
    // Gets each member from guild it was called in 
    var count = message.guild.members.forEach(member => {
        // Actually deletes the field
        if (!member.user.bot) { //ignoring the bots in the server.
            var removeField = currentMembers.doc(`${message.member.id}`).update({
                affection: FieldValue.delete()
            }).catch(err => {
                console.log(`The ID doesn't have the field being deleted, so "Probably a bot`)
            });
        };
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 'Moderator'
};

exports.help = {
    name: 'wipe',
    category: 'Not abuse',
    description: 'Wipes fields of all member props',
    usage: 'wipe'
};
