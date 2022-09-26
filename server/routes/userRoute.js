const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');

router.get('/:id', userCtrl.getInfo);
router.put('/:id', auth, userCtrl.updateInfo);
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

module.exports = router;