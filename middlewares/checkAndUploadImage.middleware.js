const {IMAGE_MIME_TYPES} = require('../constants');

module.exports = (req, res, next) => {
    req.images = [];

    if (!req.files) {
        return next();
    }

    const files = Object.values(req.files);

    for (const file of files) {
        const {mimetype, size} = file;
        console.log(size, mimetype);

        if (IMAGE_MIME_TYPES.includes(mimetype)) {
                req.images.push(file);
        }
    }

    next();
}
