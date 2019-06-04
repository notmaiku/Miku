exports.run = (client, message, args, member) => {
    const target = message.mentions.members.first();
    const admin = require('firebase-admin');
    const firebase = require('firebase');

    //references
    var db = admin.firestore();

    // Checks to register discord user into firebase
    if (target != null || undefined) {
        var userRef = db
            .collection('servers')
            .doc(`${message.guild.id}`)
            .collection('members')
            .doc(`${target.id}`);
        var memberData = userRef.set(
            {
                affection: 0
            },
            { merge: true }
        );
     var getDoc = userRef
        .get()
        .then(doc => {
            if (doc.data().id == '104030302023720960') {
                message.channel.send("Sorry, you're not in my league 😒");
            } else if (!doc.exists || doc.data().affection == undefined) {
                message.channel.send("You don't like me what D:");
                console.log(`Document doesn't exist`);
            } else {
                //updates
                var likes = doc.data().affection + 1;
                userRef.update({ affection: likes });
                message.channel.send(`oWo? ${target} What's up hot suff?😏`);
                message.channel.send(`${target} likes me this much ${likes}`);
            }
        })
        .catch(err => {
            console.log(`Error getting document`, err);
        });
    
    }else {
        message.channel.send(`Hey! Try defining a user first 😅`);
        //This gets the data
    }



};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 'User'
};

exports.help = {
    name: 'flirt',
    category: 'Miscellaneous',
    description: 'flirts with the given user and tracks crush lvl',
    usage: 'flirt @[user]'
};
