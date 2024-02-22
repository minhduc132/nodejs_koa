
const Storage = require('../../storage.js');
const FileStorage = require('../../fileStorage.js');

const storage = new Storage(new FileStorage('./data.json'));
class HomeController {

    async addNewHome(ctx) {
        let newProduct = await
         storage.add(ctx.request.body);
        ctx.body = newProduct;
    }

    async searchNameHome(ctx) {
        let searchResult = await
         storage.search(ctx.params.name);
        ctx.body = searchResult;
    }

    async updateHome(ctx) {
        let updatedProduct = await 
        storage.update(ctx.params.id, ctx.request.body);
        ctx.body = updatedProduct;
    }

    async deleteHome(ctx) {
        let filteredProducts = await 
        storage.delete(ctx.params.id);
        ctx.body = filteredProducts;
    }
}

module.exports = new HomeController();
