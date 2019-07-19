exports.run = (client, message) => {
    let tyler = require('../gay')
    message.channel.send("Tyler likes "+tyler.dog+" Let's do some math " + tyler.math(2));
    let kek = (n) => {
        return tyler.math(n) * tyler.math(n)
    } 
    message.channel.send("Kek version "+kek(3))
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["tyler"],
    permLevel: "User"
};

exports.help = {
    name: "tyler is gay",
    category: "Miscellaneous",
    description: "Does math for Tyler",
    usage: "shebly #"
};
