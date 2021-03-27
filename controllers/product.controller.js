const {productsService, commentsService} = require('../services');
const {uploadImage} = require('../helpers');

module.exports = {
    getAll: async (req, res) => {
        try {
            const products = await productsService.getAll();

            res.json(products);
        } catch (e) {
            console.log(e);
        }
    },

    getById: async (req, res) => {
        try {
            const {id} = req.params;
            const [[product], comments] = await Promise.all([
                productsService.getById(id),
                commentsService.getAllByProductId(id)
            ])

            product.commentsInfo = comments;
            res.json(product);
        } catch (e) {
            console.log(e);
        }
    },

    create: async (req, res) => {
        try {
            const [image] = req.images;

            const allProducts = await productsService.getAll()
            const newId = allProducts.length + 1;

            req.body.imageUrl = await uploadImage(newId, image, 'products');
            req.body.id = newId;

            await productsService.create(req.body);
            res.json({});
        } catch (e) {
            console.log(e);
        }
    },

    update: async (req, res) => {
        try {
            const [image] = req.images;
            const {id} = req.params;

            if (image) {
                req.body.imageUrl = await uploadImage(id, image, 'products');
            }

            await productsService.update(req.body);
            res.json({});
        } catch (e) {
            console.log(e);
        }
    },

    delete: async (req, res) => {
        try {
            const {id} = req.params;

            await productsService.delete(id);

            res.json({});
        } catch (e) {
            console.log(e);
        }
    }
}
