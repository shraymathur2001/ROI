const mysql = require('mysql');
var isConnected = true;

var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    port: 3306,
    password: "password",
    database: "ROIFINAL"
});


connection.connect((err) => {
    if (err) {
        isConnected = false;
        console.log("Failed to connect");
    }
    else {
        console.log('Database connected successfully');
    }
})

module.exports = {connection, isConnected};