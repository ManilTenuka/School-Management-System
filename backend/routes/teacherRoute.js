const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.get('/getAllTeachers', teacherController.getAllTeachers);
router.post('/createTeacher',teacherController.createTeacher);
router.delete('/deleteTeacher/:teacherId', teacherController.deleteTeacher);
router.put('/updateTeacher/:teacherId', teacherController.updateTeacher);

module.exports = router;