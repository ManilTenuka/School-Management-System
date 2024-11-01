const db = require('../config/db'); // Import the database connection

// Controller function to get all students
exports.getAllStudents = (req, res) => {
    const query = 'SELECT * FROM students'; // SQL query to get all students

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching students:', err);
            res.status(500).json({ error: 'Failed to retrieve students' });
        } else {
            res.status(200).json(results); 
        }
    });
};
