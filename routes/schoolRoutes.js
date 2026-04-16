const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');
const { validateAddSchool, validateListSchools } = require('../middlewares/validateRequest');

router.post('/addSchool', validateAddSchool, schoolController.addSchool);
router.get('/listSchools', validateListSchools, schoolController.listSchools);

module.exports = router;
