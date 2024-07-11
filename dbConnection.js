const mysql = require('mysql');
var isConnected = true;

// var connection = mysql.createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     port: 3306,
//     password: "password",
//     database: "ROIFINAL"
// });

var connection = mysql.createConnection({
    host: "162.241.126.227",
    user: "cyntexalabs_roi",
    // port: 3306,
    password: "Tarak@323@$%",
    database: "cyntexalabs_ROI"
});

connection.connect((err) => {
    if (err) {
        isConnected = false;
        console.log("Failed to connect",err);
    }
    else {
        console.log('Database connected successfully');
    }
})

module.exports = {connection, isConnected};