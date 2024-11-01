const db = require('./db'); 

db.query('SELECT 1 + 1 AS result', (err, results) => {
    if (err) {
        console.error('Connection test failed:', err.message);
    } else {
        console.log('Connection successful! Test query result:', results[0].result);
    }
    db.end(); 
});
