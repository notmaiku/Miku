exports.run = (client, message, args) => {
    const admin = require('firebase-admin');
    var db = admin.firestore();
    var memberRef = db.collection('servers').doc(`${message.guild.id}`).collection(`members`).doc(`${message.author.id}`);
    var getMember = memberRef.get().then(propSet => {
        Object.keys(propSet.data()).forEach((key) => {
            if (propSet.data().hasOwnProperty(key)) {
                message.channel.send(key + "->" + propSet.data()[key])
            }
        })
}).catch(err => {
    console.log(`Error getting document`, err);
});
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "displays stats",
    category: "server",
    description: "Will display someone's stats",
    usage: "dstats"
};
