// productController.js
const Storage = require('../../storage.js');
const FileStorage = require('../../fileStorage.js');
const storage = new Storage(new FileStorage('./data/user.json'));

class UserController {

    async addUser(ctx) {
        try {
        let newProduct = await storage.add(ctx.request.body);
        ctx.body = newProduct;
        } catch (error) {
            ctx.body = { error: "error add user" };
            return;
        }
    }
    
    async searchUser(ctx) {
        let searchResult = await storage.search(ctx.request.body.name);
        ctx.body = searchResult;
    }

    async updateUser(ctx) {   
        let updatedUser = await storage.update(ctx.request.body.id, ctx.request.body);
        ctx.body = updatedUser;
        } catch (error) {
            ctx.body = { error: "error add user" };
        }
     
    async deleteUser(ctx) {
    
        let filteredProducts = await storage.delete(ctx.request.body.id);
        ctx.body = filteredProducts;
        }
}
module.exports = new UserController();
