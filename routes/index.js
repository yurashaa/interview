const {Router} = require('express');

const router = Router();

const productsRouter = require('./products.router');
const commentsRouter = require('./comments.router');

router.use('/products', productsRouter);
router.use('/comments', commentsRouter);

module.exports = router;
