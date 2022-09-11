const postCtrl = require('../controllers/postCtrl');
// const auth = require('../middleware/auth');

const router = require('express').Router();

router.post('/', postCtrl.create);
router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.get('/me/:username', postCtrl.getMyPosts);
router.post('/search', postCtrl.search);
router.put('/:id', postCtrl.update);
router.delete('/:id', postCtrl.delete);

module.exports = router;