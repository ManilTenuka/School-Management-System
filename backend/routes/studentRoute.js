const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController'); 


router.get('/getAllStudents', studentController.getAllStudents);

module.exports = router;
