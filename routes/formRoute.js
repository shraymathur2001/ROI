const router = require('express').Router();
const formControl = require('../controller/formController');

// routes
router.post('/storeCompanyInfo', formControl.storeUserData);
router.post('/get-efficiency', formControl.efficiency);
router.post('/get-features', formControl.cloudFeatures);
router.get('/get-licensesAndCost', formControl.licensesAndCost);
// router.post('/tobackend', formControl.dataBackend);


module.exports = router;