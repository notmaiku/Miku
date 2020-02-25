module.exports = function (client, user_id, guild_id, message, table, output) {
    // Getting conf and connecting to mongo 
    let mc = client.config.mongo
    mc.c.connect(mc.url, mc.p, (err, client) => {
        mc.a.equal(null, err);
        const db = client.db('gal')
        //Querying for user's affection
        let cursor = db.collection(table).find({
            user_id: user_id,
            guild_id: guild_id
        })
        //I don't know why I have to do forEach but this it to access to cursor
        cursor.forEach(prop => {
            message.channel.send(`${output} ${prop.affection}!`)
        })
        client.close()
    })
}