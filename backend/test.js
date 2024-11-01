const db = require('./config/db'); 
db.query('SELECT 1 + 1 AS result', (err, results) => {
    if (err) {
        console.error('Connection test failed:', err.message);
    } else {
        console.log('Connection successful! Test query result:', results[0].result);
    }
    db.end(); 
});


console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);