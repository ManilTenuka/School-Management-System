const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.get('/getAllTeachers', teacherController.getAllTeachers);
router.post('/createTeacher',teacherController.createTeacher);
router.delete('/deleteTeacher/:teacherId', teacherController.deleteTeacher);
router.put('/updateTeacher/:teacherId', teacherController.updateTeacher);
router.get('/getCourseIdForTeacher/:teacherId', teacherController.getCourseIdForTeacher);
router.delete('/deleteTeacherCourse', teacherController.deleteTeacherCourse);
router.post('/createTeacherCourseTable',teacherController.CreateTeacherCourseTable);
router.get('/getCoursesByTeacherId/:teacherId',teacherController.getCoursesByTeacherId);
router.get('/getTeacherById/:teacherId',teacherController.getTeacherDetails);



module.exports = router;