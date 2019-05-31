exports.run = (client, message, args) => {
    const target = message.mentions.members.first();
    const admin = require("firebase-admin");

    //references
    var db = admin.firestore();
    var userRef = db.collection('users').doc(`${target}`);

    // Checks to register discord user into firebase
    if (target != null || undefined) {
        var setMaiku = userRef.set({
            affection: 0
        })
    } else {
        message.channel.send(`Hey! Try defining a user first 😅`)
    }

    // This gets the data
    var getDoc = userRef.get()
        .then(doc => {
            if (!doc.exists) {
                console.log(`Document doesn't exist`)
            } else {
                //updates
                var likes = doc.data().affection + 1
                userRef.update({ affection: likes })
                message.channel.send(
                    `Ara ara~ ${target} are you getting short on money mister?😏`
                );
                message.channel.send(`${target} likes me this much ${likes}`)
            }
        })
        .catch(err => {
            console.log(`Error getting document`, err);
        });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "flirt",
    category: "Miscellaneous",
    description: "flirts with the given user and tracks crush lvl",
    usage: "flirt @[user]"
};