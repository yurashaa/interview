const fs = require('fs');

const productsDir = './data/comments.txt';

class CommentsService {
    getAll() {
        let comments = [];

        return new Promise(((resolve, reject) => {
            fs.readFile(productsDir, (err, data) => {
                if (err) {
                    reject('Can`t open comments.txt file');
                }
                if (data.toString()) {
                    comments = JSON.parse(data.toString());
                }
                resolve(comments);
            })
        }))
    }

    getAllByProductId(id) {
        let comments = [];

        return new Promise(((resolve, reject) => {
            fs.readFile(productsDir, (err, data) => {
                if (err) {
                    reject('Can`t open comments.txt file');
                }
                if (data.toString()) {
                    comments = JSON.parse(data.toString()).filter(comment => comment.productId === +id)
                }
                resolve(comments);
            })
        }))
    }

    async create(comment) {
        const comments = await this.getAll();

        this.updateFile([...comments, {...comment, id: comments.length - 1}])
    }

    async deleteById(id) {
        const comments = await this.getAll();
        const deleteId = comments.findIndex(comment => comment.id === +id);
        comments.splice(deleteId, 1);
        await this.updateFile(comments);
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

module.exports = new CommentsService();
