exports.run = (client, message, args) => {
    const target = message.mentions.members.first();
    message.channel.send(
        `Ara ara~ ${target} are you getting short on money mister?😏`
    );
    const admin = require("firebase-admin");

    var db = admin.firestore();

    // Makes a user in firebase
    var userRef = db.collection('users').doc(`${target}`);
    var setMaiku = userRef.set({
        affection: 0
    })

    // This gets the data
    var getDoc = userRef.get()
        .then(doc => {
            if (!doc.exists) {
                console.log(`Document doesn't exist`)
            } else {
                //updates
                var likes = doc.data().affection + 1
                userRef.update({ affection: likes })
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
