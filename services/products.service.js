const fs = require('fs');

const productsDir = './data/products.txt';

class ProductsService {
    getAll() {
        let products = [];

        return new Promise(((resolve, reject) => {
            fs.readFile(productsDir, (err, data) => {
                if (err) {
                    reject('Can`t open products.txt file');
                }
                if (data.toString()) {
                    products = JSON.parse(data.toString())
                }
                resolve(products);
            })
        }))
    }

    getById(id) {
        return new Promise(((resolve, reject) => {
            fs.readFile(productsDir, (err, data) => {
                if (err) {
                    reject('Can`t open products.txt file');
                }

                const product = JSON.parse(data.toString()).filter(product => product.id === +id);
                resolve(product);
            })
        }))
    }

    async create(product) {
        const products = await this.getAll();

        await this.updateFile([...products, product]);

        return {id: products.length};
    }

    async update(newProduct) {
        const {id} = newProduct;

        const products = await this.getAll();

        let newProducts = products.map(product => {
            if(product.id === +id) {
                if (newProduct.imageUrl) {
                    return {...newProduct, id: +id};
                } else {
                    return {...newProduct, id: +id, imageUrl: product.imageUrl}
                }
            }
            return product;
        });

        await this.updateFile(newProducts);
    }

    async delete(id) {
        const products = await this.getAll();
        const deleteId = products.findIndex(product => product.id === +id);
        products.splice(deleteId, 1);
        await this.updateFile(products);
    }

    updateFile(data) {
        fs.writeFile(productsDir, JSON.stringify(data), err => {
            return new Promise((resolve, reject) => {
                if(err) {
                    reject('Failed to write the file');
                }
                resolve(data);
            })
        })
    }
}

module.exports = new ProductsService();
