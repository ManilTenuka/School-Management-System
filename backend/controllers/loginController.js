const bcrypt = require('bcrypt');
const db = require('../config/db'); 

exports.verifyLoginDetails = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        // Check if the user exists
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];

        // Compare provided password with stored hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ message: 'Error verifying credentials' });
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // If passwords match, respond with a success message
            res.status(200).json({ message: 'Login successful' });
        });
    });
};
