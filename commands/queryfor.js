exports.run = (client, message, args) => {
    const admin = require('firebase-admin');
    var db = admin.firestore();
    //You can use the firebase where clause but idk
    var whereclause = db.collection('servers').doc(`${message.guild.id}`).collection(`members`).where(`${args}`, `>`, 0);
    //This one doesn't use search query
    var nameQuery = db.collection('servers').doc(`${message.guild.id}`).collection(`members`).orderBy('username');
    nameQuery.get().then(queryFor => {
        message.channel.send(`There are ${queryFor.size} results`)
        if (queryFor.size > 0) {
            queryFor.forEach((doc) => {
                if (doc.data().affection && doc.data().username) {
                    message.channel.send(`${doc.data().username}: ${doc.data().affection}`);
                }
            })
        } else {
            message.channel.send("No results found :(")
        }
    }).catch(err => {
        console.log('error')
    })

    //Each member call the database
    
    // message.guild.members.forEach(member => {
    //     var affectionQuery = db .collection('servers') .doc(`${message.guild.id}`) .collection(`members`).doc(`${member.user.id}`);
    //     affectionQuery .get() .then(affectionProp => {
    //             if (!member.user.bot) {
    //                 if (affectionProp.data().affection > 1) {
    //                     //ignoring the bots in the server.
    //                     if (!member.user.bot) {
    //                         message.channel.send(
    //                             `${
    //                                 affectionProp.data().username
    //                             } affection is ${
    //                                 affectionProp.data().affection
    //                             }`
    //                         );
    //                     }
    //                 }
    //             }
    //         })
    //         .catch(err => {
    //             console.log('Something went wrong');
    //         });
    // });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 'User'
};

exports.help = {
    name: 'Displays your filter',
    category: 'server',
    description: 'Will display all you filtered',
    usage: 'query'
};
