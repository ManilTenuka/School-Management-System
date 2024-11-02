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

exports.createTeacher = (req, res) => {
    const { firstName, lastName, birthday, address, gender, courseList } = req.body;
  
    const sql = `
      INSERT INTO teachers (first_name, last_name, birthday, address, gender)
      VALUES (?, ?, ?, ?, ?)`;
    const values = [firstName, lastName, birthday, address, gender];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting teacher:', err);
        return res.status(500).json({ message: 'Error creating teacher' });
      }

      if (!courseList || courseList.length === 0) {
        return res.status(201).json({ message: 'Teacher added successfully without courses'});
      }
      const teacherId = result.insertId; // The newly created teacher's ID
   
      //insert data into teacher_courses table
      
      const teacherCoursesSql = `
        INSERT INTO teacher_courses (teacher_id, course_id)
        VALUES ?`;
  
     
      const teacherCoursesValues = courseList.map((courseId) => [teacherId, courseId]);
      
        db.query(teacherCoursesSql, [teacherCoursesValues], (err) => {
            if (err) {
              console.error('Error inserting teacher courses:', err);
              return res.status(500).json({ message: 'Error adding courses for teacher' });
            }
      
            res.status(201).json({ message: 'Teacher and courses added successfully', teacherId });
          });
      
     
    });
  };
  

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

exports.getCourseIdForTeacher = (req, res) => {
    const teacherId = req.params.teacherId;

    const query = `
        SELECT course_id 
        FROM teacher_courses 
        WHERE teacher_id = ?`;

    db.query(query, [teacherId], (err, results) => {
        if (err) {
            console.error('Error fetching courses for teacher:', err);
            res.status(500).json({ error: 'Failed to retrieve courses for the teacher' });
        } else if (results.length === 0) {
            res.status(200).json([]);
        } else {
            res.status(200).json(results.map(result => result.course_id)); // Return only course IDs
        }
    });
};

exports.deleteTeacherCourse = (req, res) => {
    const { teacherId, courseList } = req.body;

    if (!teacherId) {
        return res.status(400).json({ error: 'teacherId is required, with courseList as a non-empty array' });
    }

    let sql;
    let values;

    // Check if courseList is empty, and set SQL accordingly
    if (!courseList || courseList.length === 0) {
        sql = `DELETE FROM teacher_courses WHERE teacher_id = ?`;
        values = [teacherId];
    } else {
        sql = `DELETE FROM teacher_courses WHERE teacher_id = ? AND course_id NOT IN (?)`;
        values = [teacherId, courseList];
    }

    // Execute the query
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error deleting teacher courses:', err);
            return res.status(500).json({ error: 'Error deleting courses for teacher' });
        }

        if (result.affectedRows === 0) {
            return res.status(200).json({ message: 'No courses were deleted as none matched the criteria' });
        }

        res.status(200).json({ message: 'Courses deleted successfully', affectedRows: result.affectedRows });
    });
};


exports.CreateTeacherCourseTable = (req, res) => {
    const { teacherId, courseList } = req.body;
    
    const insertSql = `
        INSERT IGNORE INTO teacher_courses (teacher_id, course_id)
        VALUES ?
    `;
    
    if(courseList.length==0){
        return res.status(200).json({message : 'Nothing to be added'});
    }
    const teacherCoursesValues = courseList.map((courseId) => [teacherId, courseId]);

    db.query(insertSql, [teacherCoursesValues], (err, result) => {
        if (err) {
            console.error('Error inserting teacher courses:', err);
            return res.status(500).json({ error: 'Failed to insert courses for teacher' });
        }
        res.status(201).json({
            message: 'Teacher courses added successfully',
            affectedRows: result.affectedRows
        });
    });
};

