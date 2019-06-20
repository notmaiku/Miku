exports.run = (client, message, args) => {
    const admin = require('firebase-admin');
    var db = admin.firestore();
    if (args > 0 && args <15) {
        let membersRef =  db.collection('servers').doc(`${message.guild.id}`).collection(`members`).orderBy('affection').limit(parseInt(args))
        let memberQuery = membersRef.get().then(queryFor => {
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
    } else {
        message.channel.send("Enter in a number for the limit uWu")
    }
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
