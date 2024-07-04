const router = require('express').Router();
const formControl = require('../controller/formController');

// routes
// router.post('/submit-form', formControl.calculation);
router.post('/get-efficiency', formControl.efficiency);
router.get('/get-features', formControl.cloudFeatures);
router.get('/get-licensesAndCost', formControl.licensesAndCost);


module.exports = router;