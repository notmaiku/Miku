exports.run = (client, message, args) => {
    const admin = require('firebase-admin');
    var db = admin.firestore();
    let results = '';
    //You can use the firebase where clause but idk
    // var whereclause = db.collection('servers').doc(`${message.guild.id}`).collection(`members`).where(`discriminator`, `<`, 1000);
    //This one doesn't use search query
    let memberRef = db.collection('servers').doc(`162321300658978816`).collection(`members`);
    let memberQuery = memberRef.once().then((queryResults) => {
        console.log(queryResults.size)
        console.log(queryResults.docs.length)
        queryResults.forEach(doc => {
            console.log(doc.id, '=>', doc.data().username)
        })
    }).catch(err => {
        console.log('Sorry, data not available 😷')
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
}