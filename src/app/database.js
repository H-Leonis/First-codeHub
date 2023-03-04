const mysql = require('mysql2');

const config = require('../app/config');



const connection = mysql.createPool( {
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
});


connection.getConnection((err, conn) => {
    conn.connect((err) => {
        if (err) {
            console.log(`连接失败~`, err);
        } else {
            console.log('连接成功~');
        }
    })
})


module.exports = connection.promise();