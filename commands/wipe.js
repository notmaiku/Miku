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
            id: FieldValue.delete()
        }).catch(err => {
            console.log(`The ID doesn't have the field being deleted, so "Probably a bot`)
        })
    })
}

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
