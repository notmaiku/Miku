// This event executes when a new guild (server) is joined.
module.exports = (client, guild, sqlRef) => {
    let mysql = require('mysql');
    let connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '~Ee^Z#*<;#;tdkyPp[i!&kp_O',
        database: 'servers'
    });
    connection.connect(function (err) {
        if (err) {
            return console.error('error: ' + err.message);
        }

        let createServer = `create table if not exists servers(
                                id int primary key auto_increment,
                                guild_id varchar(255)not null,
                                name varchar(255)not null,
                                owner_id varchar(255)not null
                            )`;

        connection.query(createServer, (err) => {
            if (err) {
                console.log(err.message);
            }
        });
        let data = { id: null, guild_id: guild.id, name: guild.name, owner_id: guild.owner.user.id };
        let exists = 'select * from servers where ' + guild.id + ''
        let check = connection.query(exists, (err) => {
            if (err) {
                console.log(err.message)
            }
        })
        if (exists === 0) {
            let createGuild = 'insert into servers set ?'
            'select * from guild_id'
            'where not guild_id = ' + guild.id + ''
            connection.query(createGuild, data, (err) => {
                if (err) {
                    console.log(err.message);
                }
            })
        } else {
            console.log("Already exists")
        }


        let createServerList = `create table if not exists users(
                                id int primary key auto_increment,
                                member_id varchar(255)not null,
                                username varchar(255)not null,
                                discriminator varchar(255)not null
                            )`;

        connection.query(createServerList, (err) => {
            if (err) {
                console.log(err.message);
            }
        });
        //adding each user as a document to the users collection within the server
        guild.members.forEach((member) => {
            if (!member.user.bot) { //ignoring the bots in the server.
                let data = { id: null, member_id: member.id, username: member.user.username, discriminator: member.user.discriminator };
                let createMember = 'insert into users set ?';
                connection.query(createMember, data, (err) => {
                    if (err) {
                        console.log(err.message);
                    }
                })
            }
        });
        connection.end(function (err) {
            if (err) {
                return console.log(err.message);
            }
        });
    });


    client.logger.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
};


