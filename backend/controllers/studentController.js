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

exports.createStudent = (req, res) => {
    const { firstName, lastName, birthday, address, gender, birthCertificateDocument, courseList } = req.body;
  
    const sql = `
        INSERT INTO students (first_name, last_name, birthday, address, gender, birth_certificate_document, enrollment_date)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_DATE)`;
    const values = [firstName, lastName, birthday, address, gender, birthCertificateDocument];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting student:', err);
        return res.status(500).json({ message: 'Error creating student' });
      }

      // If no courses are provided, send response immediately
      if (!courseList || courseList.length === 0) {
        return res.status(201).json({ message: 'Student added successfully without courses', studentId: result.insertId });
      }

      const studentId = result.insertId; // The newly created student's ID

      // Insert data into student_courses table
      const studentCoursesSql = `
        INSERT INTO student_courses (student_id, course_id)
        VALUES ?`;

      const studentCoursesValues = courseList.map((courseId) => [studentId, courseId]);

      db.query(studentCoursesSql, [studentCoursesValues], (err) => {
        if (err) {
          console.error('Error inserting student courses:', err);
          return res.status(500).json({ message: 'Error adding courses for student' });
        }

        // Respond after successful insertion of student and courses
        res.status(201).json({ message: 'Student and courses added successfully', studentId });
      });
    });
};



exports.getStudentDetails = (req, res) => {
    const studentId = req.params.studentId;

    const query = "SELECT * FROM students where id = ? ";
    
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

exports.deleteStudent = (req, res) => {
    const studentId = req.params.studentId;

    const query = "DELETE FROM students WHERE id = ?";
    db.query(query, [studentId], (err, results) => {
        if (err) {
            console.error('Error deleting student:', err);
            res.status(500).json({ error: 'Failed to delete student' });
        } else if (results.affectedRows === 0) { // Check if any rows were deleted
            res.status(404).json({ message: 'Student not found' });
        } else {
            res.status(200).json({ message: 'Student deleted successfully' });
        }
    });
};

exports.updateStudent = (req, res) => {
    const studentId = req.params.studentId; // Retrieve student ID from the request parameters
    const { firstName, lastName, birthday, address, gender, birthCertificateDocument } = req.body;

  
    const query = `
        UPDATE students 
        SET first_name = ?, last_name = ?, birthday = ?, address = ?, gender = ?, birth_certificate_document = ?
        WHERE id = ?`;

  
    const values = [firstName, lastName, birthday, address, gender, birthCertificateDocument, studentId];

    
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating student:', err);
            res.status(500).json({ error: 'Failed to update student' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Student not found' });
        } else {
            res.status(200).json({ message: 'Student updated successfully' });
        }
    });
};

exports.getCourseIdForStudent = (req, res) => {
    const studentId = req.params.studentId;

    const query = `
        SELECT course_id 
        FROM student_courses 
        WHERE student_id = ?`;

    db.query(query, [studentId], (err, results) => {
        if (err) {
            console.error('Error fetching courses for student:', err);
            res.status(500).json({ error: 'Failed to retrieve courses for the student' });
        } else if (results.length === 0) {
            res.status(200).json([]); // Return an empty array if no courses found
        } else {
            res.status(200).json(results.map(result => result.course_id)); // Return only course IDs
        }
    });
};

exports.deleteStudentCourse = (req, res) => {
    const { studentId, courseList } = req.body;

    if (!studentId) {
        return res.status(400).json({ error: 'studentId is required, with courseList as a non-empty array' });
    }

    let sql;
    let values;

    // If no courses are specified, delete all courses for the student
    if (!courseList || courseList.length === 0) {
        sql = `DELETE FROM student_courses WHERE student_id = ?`;
        values = [studentId];
    } else {
        sql = `DELETE FROM student_courses WHERE student_id = ? AND course_id NOT IN (?)`;
        values = [studentId, courseList];
    }

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error deleting student courses:', err);
            return res.status(500).json({ error: 'Error deleting courses for student' });
        }

        if (result.affectedRows === 0) {
            return res.status(200).json({ message: 'No courses were deleted as none matched the criteria' });
        }

        res.status(200).json({ message: 'Courses deleted successfully', affectedRows: result.affectedRows });
    });
};

exports.createStudentCourseTable = (req, res) => {
    const { studentId, courseList } = req.body;

    const insertSql = `
        INSERT IGNORE INTO student_courses (student_id, course_id)
        VALUES ?
    `;

    if (!courseList || courseList.length === 0) {
        return res.status(200).json({ message: 'Nothing to be added' });
    }

    const studentCoursesValues = courseList.map((courseId) => [studentId, courseId]);

   
    db.query(insertSql, [studentCoursesValues], (err, result) => {
        if (err) {
            console.error('Error inserting student courses:', err);
            return res.status(500).json({ error: 'Failed to insert courses for student' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(200).json({ message: 'No new student courses were added', studentCoursesValues });
        }
    
        res.status(201).json({
            message: 'Student courses added successfully',
            affectedRows: result.affectedRows,
            insertedCourses: studentCoursesValues
        });
    });
    
};
