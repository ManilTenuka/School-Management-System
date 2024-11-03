const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController'); 


router.post('/verifyLogin', loginController.verifyLoginDetails);

module.exports = router;
