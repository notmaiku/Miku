module.exports = function (client, guild_id, message, table) {
    // Getting conf and connecting to mongo 
    let mc = client.config.mongo
    mc.c.connect(mc.url, mc.p, (err, client) => {
        mc.a.equal(null, err);
        const db = client.db('gal')
        // This aggregates our results to join user field into affection
        let selected = db.collection('affection').aggregate([
            //Only gets affection docs with the guild id FK
            {
                $match: {
                    guild_id: message.guild.id
                }
            },
            {
                //Actual what to merge part
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'prop'
                },
            }
        ])
        // Taking aggregated result and printing out the respected username
        selected.forEach((user) => {
            //I build the msg to user, but not whole msg uWu
            let msg = 'Affection is '
            msg += user.affection + ' for '
            user.prop.forEach((user) => {
                message.channel.send(msg + user.username)
            })
        })
        client.close()
    })
}