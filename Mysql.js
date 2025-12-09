const mysql = require('mysql2/promise');
const config = require('./config');

let MysqlGrand = mysql.createPool(config.mysql)

try {
    MysqlGrand.getConnection();
    console.log('Connected to MySQL database.');
} catch (error) {
    console.error('Failed to connect to MySQL database:', error);
}
module.exports = MysqlGrand;