exports.run = (client, message, args) => {
    const admin = require('firebase-admin');
    var db = admin.firestore();
    var nameQuery = db.collection('servers').doc(`${message.guild.id}`).collection(`members`).orderBy('affection', 'desc').limit(parseInt(args))
    nameQuery.get().then(queryFor => {
        message.channel.send(`There are ${queryFor.size} results`)
        if (queryFor.size > 0) {
            queryFor.forEach((doc) => {
                if (doc.data().username) {
                    message.channel.send(`${doc.data().username}: ${doc.data().affection}`);
                }
            })
        } else {
            message.channel.send("No results found :(")
        }
    }).catch(err => {
        console.log('error')
    })
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "Displays your filter",
    category: "server",
    description: "Will display all you filtered",
    usage: "query"
};
