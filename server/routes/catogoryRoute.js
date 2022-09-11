const userCtrl = require('../controller/userCtrl');

const router = require('express').Router();

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.put('/update', userCtrl.update);

module.exports = router;