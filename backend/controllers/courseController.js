const db = require('../config/db'); 


exports.getAllCourses = (req, res) => {
    const query = 'SELECT * FROM courses'; 

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching courses:', err);
            res.status(500).json({ error: 'Failed to retrieve courses' });
        } else {
            res.status(200).json(results); 
        }
    });
};

exports.createCourse = (req,res ) => {

    const { courseName, courseDescription } = req.body;

  const sql = `
    INSERT INTO courses (course_name, course_description)
    VALUES (?, ?)`;
  const values = [courseName, courseDescription];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting Course:', err);
      return res.status(500).json({ message: 'Error creating Course' });
    }
    res.status(201).json({ message: 'Course created successfully'});
  });
}


exports.updateCourse = (req, res) => {
    const courseId = req.params.courseId; 
    const { courseName, courseDescription } = req.body;

    if (!courseName || !courseDescription) {
        return res.status(400).json({ error: 'courseName and courseDescription are required' });
    }
    const query = `
        UPDATE courses
        SET course_name = ?, course_description = ?
        WHERE course_id = ?`;

  
    const values = [courseName, courseDescription , courseId];

    
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating Course:', err);
            res.status(500).json({ error: 'Failed to update Course' });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Course not found' });
        } else {
            res.status(200).json({ message: 'Course updated successfully' });
        }
    });
};

exports.deleteCourse = (req, res) => {
    const courseId = req.params.courseId;

    const query = "DELETE FROM courses WHERE course_id = ?";
    db.query(query, [courseId], (err, results) => {
        if (err) {
            console.error('Error deleting Course:', err);
            res.status(500).json({ error: 'Failed to delete Course' });
        } else if (results.affectedRows === 0) { 
            res.status(404).json({ message: 'Course not found' });
        } else {
            res.status(200).json({ message: 'Course deleted successfully' });
        }
    });
};


