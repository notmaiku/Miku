exports.run = (client, message, args) => {
    const target = message.mentions.members.first();
    message.channel.send(
            `Yo mister! ${target} Are ya running a bit low on cash? 😏`
    );
};
