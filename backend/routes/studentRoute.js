const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController'); 


router.get('/getAllStudents', studentController.getAllStudents);
router.post('/createStudent',studentController.createStudent);
router.get('/viewStudent/:studentId', studentController.getStudentDetails);
router.delete('/deleteStudent/:studentId', studentController.deleteStudent);
router.put('/updateStudent/:studentId', studentController.updateStudent);
router.get('/getCourseIdForStudent/:studentId', studentController.getCourseIdForStudent);
router.delete('/deleteStudentCourse', studentController.deleteStudentCourse);
router.post('/createStudentCourseTable',studentController.createStudentCourseTable);
<<<<<<< HEAD
=======
router.get('/getCourseByStudentId/:studentId',studentController.getCoursesByStudentId);
>>>>>>> 5bf90f8910245b238d92b428ec6504a0e8276ee4

module.exports = router;
