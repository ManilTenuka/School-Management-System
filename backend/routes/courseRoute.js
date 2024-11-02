const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController'); 

router.get('/getAllCourses', courseController.getAllCourses);
router.post('/createCourse',courseController.createCourse);
router.put('/updateCourse/:courseId', courseController.updateCourse);
router.delete('/deleteCourse/:courseId', courseController.deleteCourse);

module.exports = router;