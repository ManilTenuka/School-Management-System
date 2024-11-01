const db = require('../config/db'); 

exports.getAllStudents = (req, res) => {
    const query = 'SELECT * FROM students'; 

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching students:', err);
            res.status(500).json({ error: 'Failed to retrieve students' });
        } else {
            res.status(200).json(results); 
        }
    });
};
