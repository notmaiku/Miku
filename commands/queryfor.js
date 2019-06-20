exports.run = (client, message, args) => {
    const admin = require('firebase-admin');
    var db = admin.firestore();
    let results = '';
    //You can use the firebase where clause but idk
    // var whereclause = db.collection('servers').doc(`${message.guild.id}`).collection(`members`).where(`discriminator`, `<`, 1000);
    //This one doesn't use search query
    let memberRef = db.collection('servers').doc(`${message.guild.id}`).collection(`members`);
    let memberQuery = memberRef.get().then(queryFor => {
        console.log(queryFor.docs.size)
        message.channel.send(`The size of the query is ${queryFor.size}`);
        if (queryFor.size > 0) {
            queryFor.docs.forEach((doc) => {
                if (doc.data().username && doc.data().affection) {
                    results += `${doc.data().username}: ${doc.data().affection}\n`
                }
            })
        } else {
            message.channel.send("No results found :(")
        }

        message.channel.send(results);
    }).catch(err => {
        console.log('error')
    })
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