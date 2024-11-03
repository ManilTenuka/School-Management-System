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
//students who have enrolled in a particular course
exports.getStudentInfo = (req,res) => {
    const  courseId = req.params.courseId ;
    const query = `
        SELECT students.*
        FROM students
        JOIN student_courses ON students.id = student_courses.student_id
        JOIN courses ON student_courses.course_id = courses.course_id
        WHERE courses.course_id = ?;
        `;


        db.query(query, [courseId], (err, results) => {
        if (err) {
            console.error("Error fetching students for the course:", err);
            res.status(500).json({ error: "Failed to retrieve students for the course" });
        } else {
            res.status(200).json(results);
        }
    });

}

exports.getCourseById = (req, res) => {
    const courseId = req.params.courseId;

    const query = "SELECT * FROM courses where course_id = ? ";
    
    db.query(query, [courseId], (err, results) => {
        if (err) {
            console.error('Error fetching Courses details:', err);
            res.status(500).json({ error: 'Failed to retrieve Courses details' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Courses not found' });
        } else {
            res.status(200).json(results[0]); 
        }
    });
};

//Teachers who have enrolled in a particular course
exports.getTeacherInfo = (req, res) => {
    const courseId = req.params.courseId;
    const query = `
        SELECT teachers.*
        FROM teachers
        JOIN teacher_courses ON teachers.teacher_id = teacher_courses.teacher_id
        JOIN courses ON teacher_courses.course_id = courses.course_id
        WHERE courses.course_id = ?;
    `;

    db.query(query, [courseId], (err, results) => {
        if (err) {
            console.error("Error fetching teachers for the course:", err);
            res.status(500).json({ error: "Failed to retrieve teachers for the course" });
        } else {
            res.status(200).json(results);
        }
    });
};


