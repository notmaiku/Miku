// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  //setup database
  const admin = require("firebase-admin");

  //references
  var db = admin.firestore();

  // Load the guild's settings
  const settings = client.getSettings(member.guild);
  console.log(settings)

  //storing the new member onto firebase
  if (!member.user.bot) {
      console.log(`${member.guild.id}`);
      var currentMember = db.collection('servers').doc(`${member.guild.id}`).collection(`members`).doc(`${member.id}`);
      var memberData = {
          id: `${member.id}`,
          username: `${member.user.username}`,
          discriminator: `${member.user.discriminator}`,
      };
      currentMember.set(memberData);
  }

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  member.guild.channels.find(c => c.name === settings.welcomeChannel).send(welcomeMessage).catch(console.error);
};