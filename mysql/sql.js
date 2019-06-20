module.exports = (client) => {

    let mysql = require('mysql');
    let connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '~Ee^Z#*<;#;tdkyPp[i!&kp_O',
        database: 'servers'
    });
    connection.connect((err) => {
        if (err) {
            return console.error('error: ' + err.message);
        }
        console.log('Connected to the MySQL server.');

    });

};