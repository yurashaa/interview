const {Router} = require('express');
const {productsController} = require('../controllers');
const {checkAndUploadImage} = require('../middlewares');

const router = Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', checkAndUploadImage, productsController.create);
router.put('/:id', checkAndUploadImage, productsController.update);
router.delete('/:id', productsController.delete)

module.exports = router;
