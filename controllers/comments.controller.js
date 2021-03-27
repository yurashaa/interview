const {commentsService} = require('../services');


module.exports = {
    getAll: async (req, res) => {
        try {
            const {productId} = req.query;

            const products = await commentsService.getAllByProductId(productId);

            res.json(products);
        } catch (e) {
            console.log(e);
        }
    },

    create: async (req, res) => {
        try {
            const {body} = req;

            await commentsService.create(body);
            res.json({});
        } catch (e) {
            console.log(e);
        }
    },

    delete: async (req, res) => {
        try {
            const {id} = req.params;

            await commentsService.deleteById(id);
            res.json({});
        } catch (e) {
            console.log(e);
        }
    }
}
