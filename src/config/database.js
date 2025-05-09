const mysql = require('mysql2');
require('dotenv').config();


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
// const connection = mysql.createPool({
//     host:process.env.DB_HOST,
//     user:process.env.DB_USER,
//     password:process.env.DB_PASSWORD,
//     database:process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit:0
//   })


// Kiểm tra kết nối
connection.connect((err) => {
    if (err) {
      console.error('❌ Kết nối thất bại:', err.stack);
      return;
    }
    console.log('✅ Kết nối thành công đến MySQL với ID:', connection.threadId);
  });
module.exports = connection;

