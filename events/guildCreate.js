// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {
    const admin = require("firebase-admin");

    //references
    var db = admin.firestore();
    var serverData = {
        id: `${guild.id}`,
        name: `${guild.name}`,
        owner: `${guild.owner}`
    };

    //creating the server reference
    var serverRef = db.collection('servers').doc(`${guild.id}`).set(serverData).then(()=> {
        console.log("Server successfully added!");
    });

    //creating the members collection within the server
    var membersInServer = db.collection('servers').doc(`${guild.id}`).collection(`members`);

    // //adding each user as a document to the users collection within the server
    guild.members.forEach(function (member, i) {
        if (!member.user.bot) { //ignoring the bots in the server.
            var currentMember = db.collection('servers').doc(`${guild.id}`).collection(`members`).doc(`${member.id}`);
            var memberData = {
                id: `${member.id}`,
                username: `${member.user.username}`,
                discriminator: `${member.user.discriminator}`,
                gayness: `1`
            };
            currentMember.set(memberData)
        }
    });

    client.logger.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
};