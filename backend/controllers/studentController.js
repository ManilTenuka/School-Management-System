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

exports.createStudent = (req,res ) => {

    const { firstName, lastName, birthday, address, gender, birthCertificateDocument } = req.body;


 

  
  const sql = `
    INSERT INTO students (first_name, last_name, birthday, address, gender, birth_certificate_document, enrollment_date)
    VALUES (?, ?, ?, ?, ?, ?, CURRENT_DATE)`;
  const values = [firstName, lastName, birthday, address, gender, birthCertificateDocument];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting student:', err);
      return res.status(500).json({ message: 'Error creating student' });
    }
    res.status(201).json({ message: 'Student created successfully', studentId: result.insertId });
  });
}

exports.getStudentDetails = (req, res) => {
    const { studentId } = req.params; 

    const query = "SELECT * FROM students WHERE student_id = ?";
    
    db.query(query, [studentId], (err, results) => {
        if (err) {
            console.error('Error fetching student details:', err);
            res.status(500).json({ error: 'Failed to retrieve student details' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Student not found' });
        } else {
            res.status(200).json(results[0]); 
        }
    });
};