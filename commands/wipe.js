exports.run = (message, guild) => {
    const admin = require('firebase-admin');

    //references
    var db = admin.firestore();
    //Members's affection field is instantiated 
    var currentMembers = db.collection('servers').doc(`${guild.id}`).collection(`members`);
    console.log(currentMembers)
    currentMembers.forEach((member) => {
        var currentMember = db.collection('servers').doc(`${guild.id}`).collection(`members`).doc(`${member.id}`);
        currentMember.update({
            gayness: FieldValue.delete()
        });
        message.channel.send('Wiped 😅')
    }).catch(err => {
        message.reply("Could not wipe server");
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
