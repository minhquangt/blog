const postCtrl = require('../controllers/postCtrl');
const auth = require('../middleware/auth');

const router = require('express').Router();

router.post('/', auth, postCtrl.create);
router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.get('/me/:userId', auth, postCtrl.getMyPosts);
router.post('/search', postCtrl.search);
router.put('/:id', auth, postCtrl.update);
router.delete('/:id', auth, postCtrl.delete);

module.exports = router;