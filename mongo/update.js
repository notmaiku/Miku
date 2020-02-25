module.exports = function (client, user_id, guild_id, message, table) {
    // Getting conf and connecting to mongo 
    let mc = client.config.mongo
    mc.c.connect(mc.url, mc.p, (err, client) => {
        mc.a.equal(null, err);
        const db = client.db('gal')
        // This just adds one to the user's affection field
        db.collection(table).updateOne({
            user_id: user_id,
            guild_id: guild_id
        }, {
            $inc: {
                affection: 1
            }
        }, {
            upsert: true,
            w: 1,
        }, )
        client.close()
    })
}
