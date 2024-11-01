const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',          
    user: 'root',      
    password: '',   
    database: 'school_management_system', 
    port: 3306                   
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database as ID', db.threadId);
});

module.exports = db;
