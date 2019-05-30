exports.run = (client, message, args) => {
    const target = message.mentions.members.first();
    message.channel.send(
        `Ara ara~ ${target} are you getting short on money mister?😏`
    );
    const admin = require("firebase-admin");

    var db = admin.firestore();

    var setDiscord = db.collection('users').doc(`${target}`);
    var setMaiku = setDiscord.set({
        affection: 0
    })


    var maikuRef = db.collection('users').doc(`${target}`);
    var getDoc = maikuRef.get()
        .then(doc => {
            if (!doc.exists) {
                console.log(`Document doesn't exist`)
            } else {
                var likes = doc.data().affection + 1
                maikuRef.update({ affection: likes })
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
    description: "flirts with the given user",
    usage: "flirt @[user]"
};
