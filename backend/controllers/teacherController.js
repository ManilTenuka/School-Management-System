const db = require('../config/db'); 

exports.getAllTeachers = (req, res) => {
    const query = 'SELECT * FROM Teachers'; 

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching teachers:', err);
            res.status(500).json({ error: 'Failed to retrieve teachers' });
        } else {
            res.status(200).json(results); 
        }
    });
};

exports.createTeacher = (req,res ) => {

    const { firstName, lastName, birthday, address, gender } = req.body;

  const sql = `
    INSERT INTO teachers (first_name, last_name, birthday, address, gender)
    VALUES (?, ?, ?, ?, ?)`;
  const values = [firstName, lastName, birthday, address, gender ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting teacher:', err);
      return res.status(500).json({ message: 'Error creating teacher' });
    }
    res.status(201).json({ message: 'teacher created successfully', teacherId: result.insertId });
  });
}

exports.deleteTeacher = (req, res) => {
    const teacherId = req.params.teacherId;

    const query = "DELETE FROM teachers WHERE teacher_id = ?";
    db.query(query, [teacherId], (err, results) => {
        if (err) {
            console.error('Error deleting Teacher:', err);
            res.status(500).json({ error: 'Failed to delete Teacher' });
        } else if (results.affectedRows === 0) { 
            res.status(404).json({ message: 'Teacher not found' });
        } else {
            res.status(200).json({ message: 'Teacher deleted successfully' });
        }
    });
};

exports.updateTeacher = (req, res) => {
    const teacherId = req.params.teacherId; 
    const { firstName, lastName, birthday, address, gender} = req.body;

  
    const query = `
        UPDATE teachers
        SET first_name = ?, last_name = ?, birthday = ?, address = ?, gender = ?
        WHERE teacher_id = ?`;

  
    const values = [firstName, lastName, birthday, address, gender , teacherId];

    
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating Teacher:', err);
            res.status(500).json({ error: 'Failed to update Teacher' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Teacher not found' });
        } else {
            res.status(200).json({ message: 'Teacher updated successfully' });
        }
    });
};
