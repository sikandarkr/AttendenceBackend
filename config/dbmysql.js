// db.js
const mysql = require('mysql2');

// Create the connection pool
const pool = mysql.createPool({
  host: '107.180.116.36',
  user: 'sikandar',
  password: 'M!^P^sf$m3Pp',
  database: 'qualitytechlab',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Check if the connection works
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Database connection established successfully!');
  connection.release(); // Release the connection back to the pool
});

module.exports = pool.promise(); // Export the pool
