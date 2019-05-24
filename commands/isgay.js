exports.run = (client, message, args) => {
    const user = message.mentions.members.first();
    message.channel.send('What?');
    message.channel.send(user + ' is fucking gay 😷');
};
