const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController'); 

router.get('/getAllCourses', courseController.getAllCourses);
router.post('/createCourse',courseController.createCourse);
router.put('/updateCourse/:courseId', courseController.updateCourse);
router.delete('/deleteCourse/:courseId', courseController.deleteCourse);
router.get('/getStudentInfo/:courseId', courseController.getStudentInfo);
router.get('/getCourseById/:courseId', courseController.getCourseById);
router.get('/getTeacherInfo/:courseId', courseController.getTeacherInfo);


module.exports = router;