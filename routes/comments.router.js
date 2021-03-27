const {Router} = require('express');
const {commentsController} = require('../controllers');

const router = Router();

router.get('/', commentsController.getAll);
router.post('/', commentsController.create);
router.delete('/:id', commentsController.delete);

module.exports = router;
